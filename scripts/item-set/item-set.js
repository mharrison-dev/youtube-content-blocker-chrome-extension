class ItemSet {
    #itemClass;

    constructor(itemClass) {
        this.#itemClass = itemClass;
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

    #getItemDivs() {
        let targetTagName = this.#itemClass.getHTMLTag();
        return document.getElementsByTagName(targetTagName);
    }
}