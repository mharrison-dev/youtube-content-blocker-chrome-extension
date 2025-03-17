class PlaylistItemSet extends ItemSet {
    #itemSetPath;
    #titlePath;
    #titleContainerPath;
    #channelNamePath;
    #thumbnailPath;

    constructor(itemSetPath, titlePath, titleContainerPath, channelNamePath, thumbnailPath) {
        super();

        this.#itemSetPath = itemSetPath;
        this.#titlePath = titlePath;
        this.#titleContainerPath = titleContainerPath;
        this.#channelNamePath = channelNamePath;
        this.#thumbnailPath = thumbnailPath;
    }

    getItems() {
        let items = [];
        let itemDivs = this.getItemDivs(this.#itemSetPath);
        for (let itemDiv of itemDivs) {
            try {
                let item = new PlaylistItem(itemDiv, this.#titlePath, this.#titleContainerPath, this.#channelNamePath, this.#thumbnailPath);
                items.push(item);
            } catch (error) {
                continue;
            }
        }

        return items;
    }
}

class PlaylistItemSetBuilder {
    #itemSetPath;
    #titlePath;
    #titleContainerPath;
    #channelNamePath;
    #thumbnailPath;

    constructor() { }

    setItemSetPath(itemSetPath) {
        this.#itemSetPath = itemSetPath;
        return this;
    }

    setTtitlePath(titlePath) {
        this.#titlePath = titlePath;
        return this;
    }

    setTitleContainerPath(titleContainerPath) {
        this.#titleContainerPath = titleContainerPath;
        return this;
    }

    setChannelNamePath(channelNamePath) {
        this.#channelNamePath = channelNamePath;
        return this;
    }

    setThumbnailPath(thumbnailPath) {
        this.#thumbnailPath = thumbnailPath;
        return this;
    }

    build() {
        if (!this.#itemSetPath) {
            throw new Error('Cannot instantiate PlaylistItemSet class without setting the item set path.');
        }

        if (!this.#titlePath) {
            throw new Error('Cannot instantiate PlaylistItemSet class without setting the title path.');
        }

        if (!this.#titleContainerPath) {
            throw new Error('Cannot instantiate PlaylistItemSet class without setting the title container path.');
        }

        if (!this.#channelNamePath) {
            throw new Error('Cannot instantiate PlaylistItemSet class without setting the channel name path.');
        }

        if (!this.#thumbnailPath) {
            throw new Error('Cannot instantiate PlaylistItemSet class without setting the thumbnail path.');
        }

        return new PlaylistItemSet(this.#itemSetPath, this.#titlePath, this.#titleContainerPath, this.#channelNamePath, this.#thumbnailPath);
    }
}