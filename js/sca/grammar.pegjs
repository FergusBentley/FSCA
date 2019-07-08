{
    var rootLanguage, currentLanguage, cats = {}, langs = {};

    class Conjunction {
        constructor(factors) {
            this.factors = factors;
        }
    }

    class Selection {
        construction(terms) {
            this.terms = terms;
        }
    }

    function createWord(wd, extensions) {
        let exts = nestBlocks(groupExtensions(extensions));
        let word = new Word(wd[0], wd[1], wd[2]);
        nestExtensions(word, exts);
        return word;

        // return groupExtensions(extensions);
    }

    function evaluateExtension(ext) {
        if (ext instanceof SoundChange) return ext;
        return new Word(ext[0], ext[1], ext[2]);
    }

    function groupExtensions(extensions) {
        // Group by indentation level
        let groups = [];
        let currentGroup = [];
        currentGroup.indent = 0;
        extensions.forEach(function(ext) {
            if (ext.indent == currentGroup.indent) {
                currentGroup.push(evaluateExtension(ext.extension));
            }
            else {
                if (currentGroup.length > 0) groups.push(currentGroup);
                currentGroup = [evaluateExtension(ext.extension)];
                currentGroup.indent = ext.indent;
            }
        });
        if (currentGroup.length > 0) groups.push(currentGroup);

        // Group by increasing indentation
        let blocks = [];
        let currentBlock = [];
        let currentIndent = 0;
        groups.forEach(function(group) {
            if (group.indent > currentIndent) {
                currentIndent = group.indent;
                currentBlock.push(group);
            }
            else {
                if(currentBlock.length > 0) blocks.push(currentBlock);
                currentBlock = [group];
                currentIndent = group.indent;
            }
        });
        if(currentBlock.length > 0) blocks.push(currentBlock);

        return blocks;
    }

    function nestBlocks(blocks) {
        let nestedBlocks = [];
        blocks.forEach(function(block) {
            let nested = block.reduceRight(function(acc, curr) {
                let parent = curr[curr.length - 1];
                if (parent instanceof SoundChange) throw "Sound change definitions cannot have extensions.";
                nestExtensions(parent, acc);
                return curr;
            });
            nestedBlocks.push(nested[0]);
        });
        return nestedBlocks;
    }

    function nestExtensions(parent, children) {
        children.forEach(function(child) {
            if (child instanceof Word) {
                parent.addForm(child);
            }
            else if (child instanceof SoundChange){
                parent.addSoundChange(child);
            }
            else throw "Invalid extension format.";
        });
    }

    function applyModifier(sound, modifier) {
        let ns = Sound.clone(sound);
        switch(modifier) {
            case "~":
                ns.qualities.push("nasal");
                break;
            case "::":
                if (ns.qualities.includes("long"))
                    ns.qualities[ns.qualities.indexOf("long")] = "overlong";
                else ns.qualities.push("overlong");
                break;
            case ":":
                if (ns.qualities.includes("long"))
                    ns.qualities[ns.qualities.indexOf("long")] = "overlong";
                else ns.qualities.push("long");
                break;
            case "<":

                break;
            case ">":

                break;
            case "^":

                break;
            case "ᵛ":

                break;
            default:
                break;
        }
        return ns;
    }
}

initial
    = head:statement tail:(newline+ s:statement {return s})* newline*
        {
            tail.unshift(head);
            return {
                "root": rootLanguage,
                "statements": tail
            };
        }


statement
    = soundChange
    / rootDefinition
    / languageMarker
    / comment


newline = (_ ("\n" / "\r\n"))

whitespace = [ \t]

_
    = ws:whitespace*
        {
            let depth = 0;
            for (let i = 0; i < ws.length; i++) {
                if (ws[i] == " ")  depth += 1;
                if (ws[i] == "\t") depth += 2;
            }
            return depth;
        }


comment
    = $ ( "//" [^\n\r]* )

soundChange
    = l:(label ?) f:sequence "/" t:sequence
        {
            return new SoundChange(f, t, l);
        }

label
    = "/#" l:$([^\n\r]*) newline
        {
            return l;
        }


sequence
    = es:(e:expression _ {return e})+
        {
            let res = es;
            es.some(function(e, i){
                if (e.hasOwnProperty("target")) {
                    res.target = i;
                    return true;
                }
            });
            return res;
        }


expression
	= head:and tail:("|" s:and { return s })*
		{
			if (tail.length == 0) return head;
            else return new Selection(tail.unshift(head));
		}


and
	= head:sound tail:("&" s:sound { return s })*
		{
			if (tail.length == 0) return head;
            else return new Conjunction(tail.unshift(head));
		}


sound
    = "(" _ e:expression _ ")" { return expr }
    / modified_sound
    / ipa_literal
    / target


ipa_literal
    = s:[iyɨʉɯuɪʏʊeøɘɵɤoəɛœɜɞʌɔæɐaɶɑɒpbtdʈɖcɟkgqɢʔmɱnɳɲŋɴʙrʀɾɽɸβfvθðszʃʒʂʐçʝxɣχʁħʕhɦɬɮwʋɹɻjɰlɭʎʟ]
        {
            return IPA.allSounds[s];
        }

modified_sound
    = s:ipa_literal ms:modifier+
        {
            ms.forEach(function(mod) {
                s = applyModifier(s, mod);
            });
            return s;
        }

modifier = "~" / "::" / ":" / "<" / ">" / "^" / "ᵛ"

target
    = "[" target:sequence "]"
        {
            return {target};
        }

//TODO: syllables, operations/filters, categories

rootDefinition
	= "@" wd:wordDefinition es:(definitionExtension*)
		{
            let word = createWord(wd, es);
            currentLanguage.addWord(word);
            return word;
		}

wordDefinition
	= gloss:wordName _ ";" _ syls:word def:( ";" _ d:description { return d; })?
		{
			let desc = def || "";
            return [gloss, syls, def];
		}

definitionExtension
	= newline ws:_ de:(formDefinition / inlineChangeDefinition)
		{
			de["indent"] = ws;
			return de;
		}

formDefinition
	= ">" wd:wordDefinition
		{
			return {"extension": wd};
		}

inlineChangeDefinition
	= "$" sc:soundChange
		{
			return {"extension": sc};
		}

wordName
	= $( wordNamePart ("." wordNamePart)* )

wordNamePart
    = cs:[A-Za-z0-9]+ { return cs.join(""); }

word
    = head:wordSyllable tail:("." s:wordSyllable { return s; })*
        {
            tail.unshift(head);
            return tail;
        }
    / wordDerivation

wordSyllable
    = stress:("'" / ",")? ss:wordSound+
        {
            return new Syllable(ss, stress);
        }

wordSound
    = modified_sound
    / ipa_literal

wordDerivation
    = head:(s:sequence? "[" wn:$(">"? wordName) "]" { return [s, wn]; })+ tail:sequence?
        {
            let flat = head.flat();
            flat.push(tail);
            let parts = [];
            flat.forEach(function(x){
                if (x != null) parts.push(x);
            });
            return parts;
        }

description
    = $( [^\n\r]+ )


languageMarker
    = r:("-" / "~") "lang;" sn:shortName p:("<" p:shortName {return p;})? ";" ln:longName
        {
            let reference = r == "~";
            let shortName = sn;
            let longName = ln;
            let parent = langs[p];
            let lang = new Language(sn, ln, parent, reference);
            langs[sn] = lang;
            if (rootLanguage == undefined) rootLanguage = lang;
            currentLanguage = lang;
            return lang;
        }

shortName = $( [a-z]+ )

longName = $( [A-Za-z ]+ )
