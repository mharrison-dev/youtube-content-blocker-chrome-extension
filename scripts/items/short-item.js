class ShortItem extends Item {
    constructor() {
        super();
        if (new.target === ShortItem) {
            throw new Error('Cannot instantiate abstract class ShortItem directly.');
        }
    }

    static getHTMLTag() {
        throw new Error('Must implement "getHTMLTag" method.');
    }

    getTitle() {
        throw new Error('Must implement "getTitle" method.');
    }

    getTitleContainer() {
        throw new Error('Must implement "getTitleContainer" method.');
    }

    getChannelName() {
        throw new Error('Must implement "getChannelName" method.');
    }

    getThumbnail() {
        throw new Error('Must implement "getThumbnail" method.');
    }

    showThumbnail() {
        let thumbnailImg = this.getThumbnail();
        thumbnailImg.removeAttribute('style');
    }

    isShowingThumbnail() {
        let thumbnailImg = this.getThumbnail();
        return thumbnailImg.getAttribute('style') === null;
    }

    includesSomeKeywordsInChannelName(keywords) {
        return false;
    }
}