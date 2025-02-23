class ItemSet {
    #titleKeywords = [];
    #channelNameKeywords = [];
    #itemFactories = [];

    constructor() {
        chrome.runtime.onMessage.addListener((keywords) => {
            this.setTitleKeywords(keywords.titleKeywords);
            this.setChannelNameKeywords(keywords.channelNameKeywords);
            this.updateItems();
        });
    }

    addItemFactory(itemFactory) {
        this.#itemFactories.push(itemFactory);
    }

    updateItems() {
        let items = this.#getItems();
        for (let item of items) {
            if (this.#shouldHideTitle(item)) {
                item.hideTitle();
            }

            if (this.#shouldHideThumbnail(item)) {
                item.hideThumbnail();
            }

            if (this.#shouldShowTitleAndThumbnail(item)) {
                item.showTitle();
                item.showThumbnail();
            }
        }
    }

    #getItems() {
        let items = [];
        for (let itemFactory of this.#itemFactories) {
            items.push(...itemFactory.getItems());
        }

        return items;
    }

    #shouldHideTitle(item) {
        if (item.isHiddingTitle()) {
            return false;
        }

        if (item.includesSomeKeywordsInTitle(this.#titleKeywords)) {
            return true;
        }

        return item.includesSomeKeywordsInChannelName(this.#channelNameKeywords);
    }

    #shouldHideThumbnail(item) {
        if (item.isHiddingThumbnail()) {
            return false;
        }

        return item.isHiddingTitle();
    }

    #shouldShowTitleAndThumbnail(item) {
        if (item.isShowingTitle()) {
            return false;
        }

        if (item.includesSomeKeywordsInTitle(this.#titleKeywords)) {
            return false;
        }

        if (item.includesSomeKeywordsInChannelName(this.#channelNameKeywords)) {
            return false;
        }

        return item.isHiddingTitle();
    }

    setTitleKeywords(keywords) {
        this.#titleKeywords = keywords;
    }

    setChannelNameKeywords(keywords) {
        this.#channelNameKeywords = keywords;
    }
}