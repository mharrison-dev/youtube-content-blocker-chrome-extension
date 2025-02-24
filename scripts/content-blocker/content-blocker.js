class ContentBlocker {
    #itemSet = undefined;
    #itemSetObserver = undefined;

    constructor() {
        this.#itemSet = new ItemSet();
    }

    start() {
        if (!this.#itemSetObserver) {
            throw new Error('Cannot start content blocker before setting "getItemDivs."');
        }

        KeywordPersistence
            .loadKeywords()
            .then((keywords) => this.#updateKeywords(keywords))
            .then(() => this.#itemSet.updateItems());
    }

    #updateKeywords(keywords) {
        this.#itemSet.setTitleKeywords(keywords.titleKeywords);
        this.#itemSet.setChannelNameKeywords(keywords.channelNameKeywords);
    }

    addItemFactory(itemFactory) {
        this.#itemSet.addItemFactory(itemFactory);
    }

    setGetItemDivs(getItemDivs) {
        this.#itemSetObserver = new ItemSetObserver(() => this.#itemSet.updateItems(), getItemDivs);
    }
}