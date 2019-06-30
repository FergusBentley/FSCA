class Language {
    constructor(sName, lName, children) {
        this.shortName = sName;
        this.longName = lName;
        this.children = children || [];
        this.parent = null;
        this.children.forEach(l => l.parent = this);
        this.dictionary = new Dictionary();
    }

    getAncestors() {
        if (this.parent == null) return [];
        return this.parent.getAncestors().concat([this.parent]);
    }

    asTree() {
        let res = "<li>";
        let tag = this.longName;
        if (!this.dictionary.isEmpty())
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
