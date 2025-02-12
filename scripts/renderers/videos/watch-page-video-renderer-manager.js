class RelatedVideoRendererManager extends VideoRendererManager {
    #videoRenderer = undefined;

    constructor(videoRenderer) {
        super();
        this.#videoRenderer = videoRenderer;
        if (!this.#canAccessNecessaryAttributesAndElements()) {
            throw new Error('Cannot instantiate class RelatedVideoRendererManager when ytd-compact-video-renderer has not been fully loaded.');
        }
    }

    getTitle() {
        let titleSpan = this.#videoRenderer.querySelector('#video-title');
        let title = titleSpan.getAttribute('title');
        return title;
    }

    getTitleContainer() {
        let titleSpan = this.#videoRenderer.querySelector('#video-title');
        return titleSpan;
    }

    getChannelName() {
        let channelNameFormattedString = this.#videoRenderer.querySelector('.style-scope ytd-channel-name').querySelector('#text');
        let channelName = channelNameFormattedString.getAttribute('title');
        return channelName;
    }

    getThumbnail() {
        return this.#videoRenderer.querySelector('.yt-core-image');
    }

    #canAccessNecessaryAttributesAndElements() {
        let channelNameFormattedString = this.#videoRenderer.querySelector('.style-scope ytd-channel-name').querySelector('#text');
        if (!channelNameFormattedString) {
            return false;
        }

        return this.getTitleContainer() && this.getThumbnail();
    }
}