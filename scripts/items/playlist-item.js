class PlaylistItem extends Item {
    constructor() {
        super();
        if (new.target === PlaylistItem) {
            throw new Error('Cannot instantiate abstract class PlaylistItem directly.');
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
}