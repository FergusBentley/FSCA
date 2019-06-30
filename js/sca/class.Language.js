class Language {
    constructor(sName, lName, parent, ref) {
        this.shortName = sName;
        this.longName = lName;
        this.children = [];
        this.parent = parent || null;
        this.isReference = ref || false;
        this.dictionary = new Dictionary();
        if (this.parent != null) {
            this.dictionary.words = Object.assign({}, this.parent.dictionary.words);
            this.parent.children.push(this);
        }
    }

    getAncestors() {
        if (this.parent == null) return [];
        return this.parent.getAncestors().concat([this.parent]);
    }

    findChild(name) {
        for (const c of this.children) {
            if (c.shortName === name) return c;
            else {
                let found = c.findChild(name);
                if (found != undefined) return found;
            }
        }
        return undefined;
    }

    asTree() {
        let res = "<li>";
        let tag = this.longName;
        if (!this.isReference)
            tag = `<a href="#${this.shortName}">${tag}</a>`;
        if (this.children.length > 0) {
            res += `<span>${tag}</span>`;
            res += "<ul>";
            for (const c of this.children) {
                res += c.asTree();
            }
            res += "</ul>"
        }
        else {
            res += tag;
        }
        return res + "</li>";
    }
}
