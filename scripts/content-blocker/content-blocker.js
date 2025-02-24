class ContentBlocker {
    #itemSetCollection = undefined;
    #itemSetObserver = undefined;

    constructor() {
        this.#itemSetCollection = new ItemSetCollection();
    }

    start() {
        if (!this.#itemSetObserver) {
            throw new Error('Cannot start content blocker before setting "getItemDivs."');
        }

        KeywordPersistence
            .loadKeywords()
            .then((keywords) => this.#updateKeywords(keywords))
            .then(() => this.#itemSetCollection.updateItems());
    }

    #updateKeywords(keywords) {
        this.#itemSetCollection.setTitleKeywords(keywords.titleKeywords);
        this.#itemSetCollection.setChannelNameKeywords(keywords.channelNameKeywords);
    }

    observe(itemSet) {
        this.#itemSetCollection.addItemSet(itemSet);
    }

    setGetItemDivs(getItemDivs) {
        this.#itemSetObserver = new ItemSetObserver(() => this.#itemSetCollection.updateItems(), getItemDivs);
    }
}