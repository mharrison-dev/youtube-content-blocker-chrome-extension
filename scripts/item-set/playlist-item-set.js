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