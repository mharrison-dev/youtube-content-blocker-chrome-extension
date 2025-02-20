class ShortItem extends Item {
    constructor() {
        super();
        if (new.target === ShortItem) {
            throw new Error('Cannot instantiate abstract class ShortItem directly.');
        }
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