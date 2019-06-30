class Dictionary {
    constructor() {
        this.words = {};
    }

    addWord(word) {
        this.words[word.gloss] = word;
    }

    isEmpty() {
        return Object.keys(this.words).length == 0;
    }

    search(name) {
        let list = this.words;
        let parts = name.split(".");
        let i = parts.length;
        let s = 0;
        let word = undefined;
        while (s < i) {
            let term = parts.slice(s, i).join(".");
            if (list.hasOwnProperty(term)) {
                let w = list[term];
                list = w.forms;
                s = i;
                i = parts.length;
                if (s >= i) word = w;
            }
            else {
                i -= 1;
            }
        }
        return word;
    }
}
