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