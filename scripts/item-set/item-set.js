class ItemSet {
    constructor() {
    }

    getItems() { }

    getItemDivs(itemSetPath) {
        let itemDivs = [];

        if (itemSetPath.endsWith('*')) {
            let selectorPath = itemSetPath.slice(0, -1);
            let itemDivSets = document.querySelectorAll(selectorPath);
            for (let itemDivSet of itemDivSets) {
                for (let itemDiv of itemDivSet.children) {
                    itemDivs.push(itemDiv);
                }
            }
        } else if (itemSetPath.includes('?>')) {
            let itemDivSet = null;
            let longerPath = itemSetPath.replace('?>', '>');
            itemDivSet = document.querySelector(longerPath);
            if (itemDivSet === null) {
                let shorterPath = itemSetPath.substring(0, itemSetPath.indexOf('?>')).trim();
                itemDivSet = document.querySelector(shorterPath);
            }
            if (itemDivSet) {
                itemDivs = itemDivSet.children;
            }
        } else {
            let itemDivSet = document.querySelector(itemSetPath);
            if (itemDivSet) {
                itemDivs = itemDivSet.children;
            }
        }

        return itemDivs;
    }
}