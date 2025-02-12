class RelatedVideoPlaylistRendererManager extends VideoPlaylistRendererManager {
    #videoPlaylistRenderer = undefined;

    constructor(videoPlaylistRenderer) {
        super();
        this.#videoPlaylistRenderer = videoPlaylistRenderer;
        if (!this.#canAccessNecessaryAttributesAndElements()) {
            throw new Error('Cannot instantiate class RelatedVideoPlaylistRendererManager when ytd-compact-video-renderer has not been fully loaded.');
        }
    }

    getTitle() {
        let titleHeaderTag = this.#videoPlaylistRenderer.querySelector('.yt-lockup-metadata-view-model-wiz__heading-reset');
        let title = titleHeaderTag.getAttribute('title');
        return title;
    }

    getTitleContainer() {
        let titleAnchorTag = this.#videoPlaylistRenderer.querySelector('.yt-lockup-metadata-view-model-wiz__title');
        let titleSpan = titleAnchorTag.querySelector('span');
        return titleSpan;
    }

    getChannelName() {
        let contentMetaDataViewModelTag = this.#videoPlaylistRenderer.querySelector('yt-content-metadata-view-model');
        let spanForChannelNames = contentMetaDataViewModelTag.querySelector('span');
        let channelNames = spanForChannelNames.innerText;
        return channelNames;
    }

    getThumbnail() {
        return this.#videoPlaylistRenderer.querySelector('img');
    }

    #canAccessNecessaryAttributesAndElements() {
        let titleHeaderTag = this.#videoPlaylistRenderer.querySelector('.yt-lockup-metadata-view-model-wiz__heading-reset');
        if (!titleHeaderTag) {
            return false;
        }

        let titleAnchorTag = this.#videoPlaylistRenderer.querySelector('.yt-lockup-metadata-view-model-wiz__title');
        if (!titleAnchorTag) {
            return false;
        }

        let contentMetaDataViewModelTag = this.#videoPlaylistRenderer.querySelector('yt-content-metadata-view-model');
        if (!contentMetaDataViewModelTag) {
            return false;
        }

        let thumbnail = this.#videoPlaylistRenderer.querySelector('img');
        if (!thumbnail) {
            return false;
        }

        return true;
    }
}