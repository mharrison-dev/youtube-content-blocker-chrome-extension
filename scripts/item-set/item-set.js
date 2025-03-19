class ItemSet {
    #itemSetPath;
    #itemSetMutationObserver;

    constructor(itemSetPath) {
        if (new.target === ItemSet) {
            throw new Error('Cannot instantiate abstract class ItemSet directly.');
        }

        this.#itemSetPath = itemSetPath;
    }

    onUpdate(callback) {
        let passItemsIntoCallback = () => {
            let items = this.getItems();
            callback(items);
        };

        this.#setUpMutationObserver(passItemsIntoCallback);
    }

    #setUpMutationObserver(callback) {
        let bodyTag = document.getElementsByTagName('body')[0];
        let config = { attributes: true, subtree: true };
        this.#itemSetMutationObserver = new MutationObserver(callback);
        this.#itemSetMutationObserver.observe(bodyTag, config);
    }

    getItems() {
        let items = [];
        let itemDivs = this.#getItemDivs();
        for (let itemDiv of itemDivs) {
            try {
                let item = this.createItem(itemDiv);
                items.push(item);
            } catch (error) {
                continue;
            }
        }

        return items;
    }

    #getItemDivs() {
        if (this.#itemSetPath.endsWith('*')) {
            return this.#getChildElementsFromAllParentElements(this.#itemSetPath);
        } else if (this.#itemSetPath.includes('?>')) {
            return this.#getChildElementsFromFragilePath(this.#itemSetPath);
        } else {
            return this.#getChildElements(this.#itemSetPath);
        }
    }

    #getChildElementsFromAllParentElements(parentElementPath) {
        let childElements = [];
        let parentElementPathWithoutMarker = parentElementPath.slice(0, -1);
        let parentElements = document.querySelectorAll(parentElementPathWithoutMarker);
        for (let parentElement of parentElements) {
            for (let childElement of parentElement.children) {
                childElements.push(childElement);
            }
        }

        return childElements;
    }

    #getChildElementsFromFragilePath(parentElementPath) {
        let completePath = parentElementPath.replace('?>', '>');
        let parentElementFromCompletePath = document.querySelector(completePath);
        if (parentElementFromCompletePath) {
            return parentElementFromCompletePath.children;
        }

        let incompletePath = parentElementPath.substring(0, parentElementPath.indexOf('?>')).trim();
        let parentElementFromIncompletePath = document.querySelector(incompletePath);
        if (parentElementFromIncompletePath) {
            return parentElementFromIncompletePath.children;
        }

        return [];
    }

    #getChildElements(parentElementPath) {
        let parentElement = document.querySelector(parentElementPath);
        if (parentElement) {
            return parentElement.children;
        }

        return [];
    }
}