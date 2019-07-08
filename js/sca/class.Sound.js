class Sound {
    constructor(glyph) {
        this.glyph = glyph;
        this.qualities = [];
    }

    static clone(sound) {
        return Object.assign(Object.create(Object.getPrototypeOf(sound)), sound)
    }
}

class Consonant extends Sound {
    constructor(glyph, place, manner, voiced) {
        super(glyph);
        this.place = place;
        this.manner = manner;
        this.voiced = voiced;
    }
}

class Vowel extends Sound {
    constructor(glyph, height, backness, rounded) {
        super(glyph);
        this.height = height;
        this.backness = backness;
        this.rounded = rounded;
    }
}

let IPA = {
    consonants : {
        "p" : new Consonant("p", "bilabial", "stop", true),
        "b" : new Consonant("b", "bilabial", "stop", true),
        "t" : new Consonant("t", "alveodental", "stop", true),
        "d" : new Consonant("d", "alveodental", "stop", true),
        "ʈ" : new Consonant("ʈ", "retroflex", "stop", true),
        "ɖ" : new Consonant("ɖ", "retroflex", "stop", true),
        "c" : new Consonant("c", "palatal", "stop", true),
        "ɟ" : new Consonant("ɟ", "palatal", "stop", true),
        "k" : new Consonant("k", "velar", "stop", true),
        "g" : new Consonant("g", "velar", "stop", true),
        "q" : new Consonant("q", "uvular", "stop", true),
        "ɢ" : new Consonant("ɢ", "uvular", "stop", true),
        "ʔ" : new Consonant("ʔ", "glottal", "stop", true),
        "m" : new Consonant("m", "bilabial", "stop", true),
        "ɱ" : new Consonant("ɱ", "labiodental", "nasal", true),
        "n" : new Consonant("n", "alveolar", "nasal", true),
        "ɳ" : new Consonant("ɳ", "retroflex", "nasal", true),
        "ɲ" : new Consonant("ɲ", "palatal", "nasal", true),
        "ŋ" : new Consonant("ŋ", "velar", "nasal", true),
        "ɴ" : new Consonant("ɴ", "uvular", "nasal", true),
        "ʙ" : new Consonant("ʙ", "bilabial", "trill", true),
        "r" : new Consonant("r", "alveolar", "trill", true),
        "ʀ" : new Consonant("ʀ", "uvular", "trill", true),
        "ɾ" : new Consonant("ɾ", "alveolar", "tap", true),
        "ɽ" : new Consonant("ɽ", "retroflex", "tap", true),
        "ɸ" : new Consonant("ɸ", "bilabial", "fricative", false),
        "β" : new Consonant("β", "bilabial", "fricative", true),
        "f" : new Consonant("f", "labiodental", "fricative", false),
        "v" : new Consonant("v", "labiodental", "fricative", true),
        "θ" : new Consonant("θ", "dental", "fricative", false),
        "ð" : new Consonant("ð", "dental", "fricative", true),
        "s" : new Consonant("s", "alveolar", "fricative", false),
        "z" : new Consonant("z", "alveolar", "fricative", true),
        "ʃ" : new Consonant("ʃ", "post alveolar", "fricative", false),
        "ʒ" : new Consonant("ʒ", "post alveolar", "fricative", true),
        "ʂ" : new Consonant("ʂ", "retroflex", "fricative", false),
        "ʐ" : new Consonant("ʐ", "retroflex", "fricative", true),
        "ç" : new Consonant("ç", "palatal", "fricative", false),
        "ʝ" : new Consonant("ʝ", "palatal", "fricative", true),
        "x" : new Consonant("x", "velar", "fricative", false),
        "ɣ" : new Consonant("ɣ", "velar", "fricative", true),
        "χ" : new Consonant("χ", "uvular", "fricative", false),
        "ʁ" : new Consonant("ʁ", "uvular", "fricative", true),
        "ħ" : new Consonant("ħ", "pharyngeal", "fricative", false),
        "ʕ" : new Consonant("ʕ", "pharyngeal", "fricative", true),
        "h" : new Consonant("h", "glottal", "fricative", false),
        "ɦ" : new Consonant("ɦ", "glottal", "fricative", true),
        "ɬ" : new Consonant("ɬ", "dental", "lateral fricative", false),
        "ɮ" : new Consonant("ɮ", "alveolar", "lateral fricative", true),
        "w" : new Consonant("w", "labiovelar", "approximant", true),
        "ʋ" : new Consonant("ʋ", "labiodental", "approximant", true),
        "ɹ" : new Consonant("ɹ", "alveolar", "approximant", true),
        "ɻ" : new Consonant("ɻ", "retroflex", "approximant", true),
        "j" : new Consonant("j", "palatal", "approximant", true),
        "ɰ" : new Consonant("ɰ", "velar", "approximant", true),
        "l" : new Consonant("l", "alveolar", "lateral approximant", true),
        "ɭ" : new Consonant("ɭ", "retroflex", "lateral approximant", true),
        "ʎ" : new Consonant("ʎ", "palatal", "lateral approximant", true),
        "ʟ" : new Consonant("ʟ", "velar", "lateral approximant", true)
    },
    vowels : {
        "i" : new Vowel("i", "close", "front", false),
        "y" : new Vowel("y", "close", "front", true),
        "ɨ" : new Vowel("ɨ", "close", "central", false),
        "ʉ" : new Vowel("ʉ", "close", "central", true),
        "ɯ" : new Vowel("ɯ", "close", "back", false),
        "u" : new Vowel("u", "close", "back", true),
        "ɪ" : new Vowel("ɪ", "nearclose", "front", false),
        "ʏ" : new Vowel("ʏ", "nearclose", "front", true),
        "ʊ" : new Vowel("ʊ", "nearclose", "back", true),
        "e" : new Vowel("e", "closemid", "front", false),
        "ø" : new Vowel("ø", "closemid", "front", true),
        "ɘ" : new Vowel("ɘ", "closemid", "central", false),
        "ɵ" : new Vowel("ɵ", "closemid", "central", true),
        "ɤ" : new Vowel("ɤ", "closemid", "back", false),
        "o" : new Vowel("o", "closemid", "back", true),
        "ə" : new Vowel("ə", "mid", "central", false),
        "ɛ" : new Vowel("ɛ", "openmid", "front", false),
        "œ" : new Vowel("œ", "openmid", "front", true),
        "ɜ" : new Vowel("ɜ", "openmid", "central", false),
        "ɞ" : new Vowel("ɞ", "openmid", "central", true),
        "ʌ" : new Vowel("ʌ", "openmid", "back", false),
        "ɔ" : new Vowel("ɔ", "openmid", "back", true),
        "æ" : new Vowel("æ", "nearopen", "front", false),
        "ɐ" : new Vowel("ɐ", "nearopen", "central", ),
        "a" : new Vowel("a", "open", "front", false),
        "ɶ" : new Vowel("ɶ", "open", "front", true),
        "ɑ" : new Vowel("ɑ", "open", "back", false),
        "ɒ" : new Vowel("ɒ", "open", "back", true)
    }
}

IPA.allSounds = Object.assign({}, IPA.vowels, IPA.consonants);
