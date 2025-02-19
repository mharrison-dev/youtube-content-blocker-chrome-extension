class HomePageVideoItem extends Item {
    #videoItemDiv = undefined;

    constructor(videoItemDiv) {
        super();
        this.#videoItemDiv = videoItemDiv;
    }

    static validate(videoItemDiv) {
        let titleAnchorTag = videoItemDiv.querySelector('#video-title-link');
        if (!titleAnchorTag) {
            return false;
        }

        let title = titleAnchorTag.getAttribute('title');
        if (!title) {
            return false;
        }

        let titleContainer = videoItemDiv.querySelector('#video-title');
        if (!titleContainer) {
            return false;
        }

        let ytdChannelNameTag = videoItemDiv.querySelector('ytd-channel-name');
        if (!ytdChannelNameTag) {
            return false;
        }

        let ytFormattedStringTag = ytdChannelNameTag.querySelector('yt-formatted-string');
        if (!ytFormattedStringTag) {
            return false;
        }

        let channelName = ytFormattedStringTag.getAttribute('title');
        if (!channelName) {
            return false;
        }

        let imgTag = videoItemDiv.querySelector('img');
        if (!imgTag) {
            return false;
        }

        let imgTagStyleAttribute = imgTag.getAttribute('style');
        if (!imgTagStyleAttribute) {
            return false;
        }

        return true;
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
}