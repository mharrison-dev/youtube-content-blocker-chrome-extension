class ItemSet {
    #titleKeywords = undefined;
    #channelNameKeywords = undefined;

    constructor() {
        if (new.target === ItemSet) {
            throw new Error('Cannot instantiate abstract class ItemSet directly.');
        }

        chrome.runtime.onMessage.addListener((keywords) => {
            this.setTitleKeywords(keywords.titleKeywords);
            this.setChannelNameKeywords(keywords.channelNameKeywords);
            this.updateItems();
        });        
    }

    updateItems() {
        let items = this.getItems();
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