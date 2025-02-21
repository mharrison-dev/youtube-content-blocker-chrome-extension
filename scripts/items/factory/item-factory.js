class ItemFactory {
    #itemClass;
    #getItemDivs;

    constructor(itemClass, getItemDivs) {
        this.#itemClass = itemClass;
        this.#getItemDivs = getItemDivs;
    }

    getItems() {
        let items = [];
        let itemDivs = this.#getItemDivs();
        for (let itemDiv of itemDivs) {
            if (this.#itemClass.validate(itemDiv)) {
                let item = new this.#itemClass(itemDiv);
                items.push(item);
            }
        }

        return items;
    }
}