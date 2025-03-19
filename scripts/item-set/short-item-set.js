class ShortItemSet extends ItemSet {
    #titlePath;
    #titleContainerPath;
    #thumbnailPath;

    constructor(itemSetPath, titlePath, titleContainerPath, thumbnailPath) {
        super(itemSetPath);

        this.#titlePath = titlePath;
        this.#titleContainerPath = titleContainerPath;
        this.#thumbnailPath = thumbnailPath;
    }

    createItem(itemDiv) {
        return new ShortItem(itemDiv, this.#titlePath, this.#titleContainerPath, this.#thumbnailPath);
    }
}

class ShortItemSetBuilder {
    #itemSetPath;
    #titlePath;
    #titleContainerPath;
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

    setThumbnailPath(thumbnailPath) {
        this.#thumbnailPath = thumbnailPath;
        return this;
    }

    build() {
        if (!this.#itemSetPath) {
            throw new Error('Cannot instantiate ShortItemSet class without setting the item set path.');
        }

        if (!this.#titlePath) {
            throw new Error('Cannot instantiate ShortItemSet class without setting the title path.');
        }

        if (!this.#titleContainerPath) {
            throw new Error('Cannot instantiate ShortItemSet class without setting the title container path.');
        }

        if (!this.#thumbnailPath) {
            throw new Error('Cannot instantiate ShortItemSet class without setting the thumbnail path.');
        }

        return new ShortItemSet(this.#itemSetPath, this.#titlePath, this.#titleContainerPath, this.#thumbnailPath);
    }
}