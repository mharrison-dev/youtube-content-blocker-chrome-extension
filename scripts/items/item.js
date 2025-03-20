class Item {
    #itemDiv;
    #titlePath;
    #titleContainerPath;
    #channelNamePath;
    #thumbnailPath;

    constructor(itemDiv, titlePath, titleContainerPath, channelNamePath, thumbnailPath) {
        if (new.target === Item) {
            throw new Error('Cannot instantiate abstract class Item directly.');
        }

        this.#itemDiv = itemDiv;
        this.#titlePath = titlePath;
        this.#titleContainerPath = titleContainerPath;
        this.#channelNamePath = channelNamePath;
        this.#thumbnailPath = thumbnailPath;
    }

    getTitle() {
        let [selectorPath, attribute] = this.#titlePath.split('>>').map(string => string.trim());
        let selectedElement = this.#itemDiv.querySelector(selectorPath);
        if (selectedElement) {
            return selectedElement.getAttribute(attribute);
        }
    }

    getTitleContainer() {
        return this.#itemDiv.querySelector(this.#titleContainerPath);
    }

    getChannelName() {
        if (!this.#channelNamePath) {
            return null;
        }

        if (this.#channelNamePath.includes('>>>')) {
            let [selectorPath, property] = this.#channelNamePath.split('>>>').map(string => string.trim());
            let selectedElement = this.#itemDiv.querySelector(selectorPath);
            if (selectedElement && property === "innerText") {
                return selectedElement.innerText;
            }
        } else {
            let [selectorPath, attribute] = this.#channelNamePath.split('>>').map(string => string.trim());
            let selectedElement = this.#itemDiv.querySelector(selectorPath);
            if (selectedElement) {
                return selectedElement.getAttribute(attribute);
            }
        }
    }

    getThumbnail() {
        return this.#itemDiv.querySelector(this.#thumbnailPath);
    }

    hide() {
        this.getThumbnail().setAttribute('style', 'display: none');
        this.getTitleContainer().innerText = 'BLOCKED';
    }

    isHidden() {
        let styleAttribute = this.getThumbnail().getAttribute('style');
        if (styleAttribute === null) {
            return false;
        }

        return styleAttribute.includes('display: none') && this.getTitleContainer().innerText === 'BLOCKED';
    }

    isDisplayed() {
        return !this.isHidden();
    }
}