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
        let res = "";
        if (this.children.length > 0) {
            res += `
                <li class="group">
                    <div class="checkbox"></div>
                    <span ${(this.isReference ? "" : `data-target="${this.shortName}"`)}>${this.longName}</span>
                    <ul>
            `;
            for (const c of this.children) {
                res += c.asTree();
            }
            res += "</li></ul>"
        }
        else {
            if (this.isReference)
                res = `<li class="language">${this.longName}</li>`;
            else
                res = `<li class="language" data-target="${this.shortName}">${this.longName}</li>`;
        }
        return res;
    }
}
