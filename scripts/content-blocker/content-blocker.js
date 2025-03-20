class ContentBlocker {
    #prohibitedTitleKeywords = [];
    #prohibitedChannelNameKeywords = [];
    #managedItemSets = [];

    constructor() {
        chrome.runtime.onMessage.addListener((keywords) => {
            this.#updateProhibitedKeywords(keywords);
            this.#updateEachManagedtemSet();
        });
    }

    #updateProhibitedKeywords(keywords) {
        this.#prohibitedTitleKeywords = keywords.titleKeywords;
        this.#prohibitedChannelNameKeywords = keywords.channelNameKeywords;
    }

    #updateEachManagedtemSet() {
        for (let itemSet of this.#managedItemSets) {
            let items = itemSet.getItems();
            this.#update(items);
        }
    }

    manage(itemSet) {
        this.#managedItemSets.push(itemSet);
        itemSet.onUpdate((items) => this.#update(items));
    }

    #update(items) {
        for (let item of items) {
            if (this.#shouldHide(item)) {
                item.hide();
            } else if (this.#shouldShow(item)) {
                item.show();
            }
        }
    }

    #shouldHide(item) {
        return item.isDisplayed()
            && this.#foundSomeProhibitedKeywords(item);
    }

    #shouldShow(item) {
        return item.isHidden()
            && !this.#foundSomeProhibitedKeywords(item);
    }

    #foundSomeProhibitedKeywords(item) {
        return this.#foundSomeProhibitedTitleKeywords(item)
            || this.#foundSomeProhibitedChannelNameKeywords(item);
    }

    #foundSomeProhibitedTitleKeywords(item) {
        return this.#foundSomeKeywords(this.#prohibitedTitleKeywords, item.getTitle());
    }

    #foundSomeProhibitedChannelNameKeywords(item) {
        return this.#foundSomeKeywords(this.#prohibitedChannelNameKeywords, item.getChannelName());
    }

    #foundSomeKeywords(keywords, target) {
        if (!target) {
            return false;
        }

        return keywords.some((keyword) => target.includes(keyword));
    }
}