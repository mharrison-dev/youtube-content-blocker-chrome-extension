class ItemSetCollection {
    #titleKeywords = [];
    #channelNameKeywords = [];
    #itemSets = [];

    constructor() {
        chrome.runtime.onMessage.addListener((keywords) => {
            this.setTitleKeywords(keywords.titleKeywords);
            this.setChannelNameKeywords(keywords.channelNameKeywords);
            this.updateItems();
        });
    }

    addItemSet(itemSet) {
        this.#itemSets.push(itemSet);
    }

    updateItems() {
        let items = this.#getItems();
        for (let item of items) {
            if (item.includesSomeKeywordsInTitle(this.#titleKeywords) || item.includesSomeKeywordsInChannelName(this.#channelNameKeywords)) {
                if (!item.isHidden()) {
                    item.hide();
                }
            } else {
                if (item.isHidden()) {
                    item.show();
                }
            }
        }
    }

    #getItems() {
        let items = [];
        for (let itemSet of this.#itemSets) {
            items.push(...itemSet.getItems());
        }

        return items;
    }

    setTitleKeywords(keywords) {
        this.#titleKeywords = keywords;
    }

    setChannelNameKeywords(keywords) {
        this.#channelNameKeywords = keywords;
    }
}