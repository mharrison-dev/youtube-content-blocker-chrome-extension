class VideoItemSet extends ItemSet {
    #titlePath;
    #titleContainerPath;
    #channelNamePath;
    #thumbnailPath;

    constructor(itemSetPath, titlePath, titleContainerPath, channelNamePath, thumbnailPath) {
        super(itemSetPath);

        this.#titlePath = titlePath;
        this.#titleContainerPath = titleContainerPath;
        this.#channelNamePath = channelNamePath;
        this.#thumbnailPath = thumbnailPath;
    }

    createItem(itemDiv) {
        return new VideoItem(itemDiv, this.#titlePath, this.#titleContainerPath, this.#channelNamePath, this.#thumbnailPath);
    }
}

class VideoItemSetBuilder {
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
            throw new Error('Cannot instantiate VideoItemSet class without setting the item set path.');
        }

        if (!this.#titlePath) {
            throw new Error('Cannot instantiate VideoItemSet class without setting the title path.');
        }

        if (!this.#titleContainerPath) {
            throw new Error('Cannot instantiate VideoItemSet class without setting the title container path.');
        }

        if (!this.#channelNamePath) {
            throw new Error('Cannot instantiate VideoItemSet class without setting the channel name path.');
        }

        if (!this.#thumbnailPath) {
            throw new Error('Cannot instantiate VideoItemSet class without setting the thumbnail path.');
        }

        return new VideoItemSet(this.#itemSetPath, this.#titlePath, this.#titleContainerPath, this.#channelNamePath, this.#thumbnailPath);
    }
}