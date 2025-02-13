class HomePageVideoItem extends Item {
    #videoItemDiv = undefined;

    constructor(videoItemDiv) {
        super();
        this.#videoItemDiv = videoItemDiv;
        if (!this.#canAccessNecessaryAttributesAndElements()) {
            throw new Error('Cannot instantiate class HomePageVideoItem when ytd-compact-video-renderer has not been fully loaded.');
        }
    }

    getTitle() {
        let titleAnchorTag = this.#videoItemDiv.querySelector('#video-title-link');
        let title = titleAnchorTag.getAttribute('title');
        return title;
    }

    getTitleContainer() {
        let ytFormattedStringTag = this.#videoItemDiv.querySelector('#video-title');
        return ytFormattedStringTag;
    }

    getChannelName() {
        let ytdChannelNameTag = this.#videoItemDiv.querySelector('ytd-channel-name');
        let ytFormattedStringTag = ytdChannelNameTag.querySelector('yt-formatted-string');
        let channelName = ytFormattedStringTag.getAttribute('title');
        return channelName;
    }

    getThumbnail() {
        return this.#videoItemDiv.querySelector('img');
    }

    #canAccessNecessaryAttributesAndElements() {
        let titleAnchorTag = this.#videoItemDiv.querySelector('#video-title-link');
        if (!titleAnchorTag) {
            return false;
        }

        let ytFormattedStringTag = this.#videoItemDiv.querySelector('#video-title');
        if (!ytFormattedStringTag) {
            return false;
        }

        let ytdChannelNameTag = this.#videoItemDiv.querySelector('ytd-channel-name');
        if (!ytdChannelNameTag) {
            return false;
        }

        let imageTag = this.#videoItemDiv.querySelector('img');
        if (!imageTag) {
            return false;
        }

        let imageTagStyle = imageTag.getAttribute('style');
        if (!imageTagStyle) {
            return false;
        }

        return true;
    }
}