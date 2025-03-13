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

    show() {
        this.getThumbnail().removeAttribute('style');
        this.getTitleContainer().innerText = this.getTitle();
    }

    isHidden() {
        return this.getTitleContainer().innerText === 'BLOCKED';
    }

    includesSomeKeywordsInTitle(keywords) {
        let title = this.getTitle();
        return this.#includesSome(keywords, title);
    }

    includesSomeKeywordsInChannelName(keywords) {
        if (this.getChannelName() == null) {
            return false;
        }

        let channelName = this.getChannelName();
        return this.#includesSome(keywords, channelName);
    }

    #includesSome(keywords, string) {
        if (!string) {
            return false;
        }

        return keywords.some((keyword) => string.includes(keyword));
    }
}