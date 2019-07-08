class SoundChange {

    constructor(from, to, label) {
        this.from = from;
        this.to = to;
        this.label = label;
        this.time = 0;
    }

    appliesTo(word) {
        return this.time < word.time;
    }

    matches(word) {
        // TODO
    }

    applyTo(word) {
        // TODO
    }
}
