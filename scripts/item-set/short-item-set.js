class ShortItemSet extends ItemSet {
    #itemSetPath;
    #titlePath;
    #titleContainerPath;
    #thumbnailPath;

    constructor(itemSetPath, titlePath, titleContainerPath, thumbnailPath) {
        super();

        this.#itemSetPath = itemSetPath;
        this.#titlePath = titlePath;
        this.#titleContainerPath = titleContainerPath;
        this.#thumbnailPath = thumbnailPath;
    }

    getItems() {
        let items = [];
        let itemDivs = this.getItemDivs(this.#itemSetPath);
        for (let itemDiv of itemDivs) {
            try {
                let item = new ShortItem(itemDiv, this.#titlePath, this.#titleContainerPath, this.#thumbnailPath);
                items.push(item);
            } catch (error) {
                continue;
            }
        }

        return items;
    }
}