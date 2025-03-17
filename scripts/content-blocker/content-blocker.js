class ContentBlocker {
    #prohibitedTitleKeywords = [];
    #prohibitedChannelNameKeywords = [];
    #managedItemSets = [];

    constructor() {
        chrome.runtime.onMessage.addListener((keywords) => {
            this.#prohibitedTitleKeywords = keywords.titleKeywords;
            this.#prohibitedChannelNameKeywords = keywords.channelNameKeywords;
            for (let itemSet of this.#managedItemSets) {
                let items = itemSet.getItems();
                this.#update(items);
            }
        });
    }

    manage(itemSet) {
        this.#managedItemSets.push(itemSet);
        itemSet.onUpdate((items) => this.#update(items));
    }

    #update(items) {
        for (let item of items) {
            if (this.#shouldHide(item)) {
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

    #shouldHide(item) {
        return item.includesSomeKeywordsInTitle(this.#prohibitedTitleKeywords)
            || item.includesSomeKeywordsInChannelName(this.#prohibitedChannelNameKeywords)
    }
}