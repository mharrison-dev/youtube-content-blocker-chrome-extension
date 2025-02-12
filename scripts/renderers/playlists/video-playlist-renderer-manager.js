class VideoPlaylistRendererManager extends VideoRendererManager {
    constructor() {
        super();
        if (new.target === VideoPlaylistRendererManager) {
            throw new Error('Cannot instantiate abstract class VideoPlaylistRendererManager directly.');
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