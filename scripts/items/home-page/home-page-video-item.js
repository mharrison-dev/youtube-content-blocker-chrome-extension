class HomePageVideoItem extends Item {
    #videoItemDiv = undefined;

    constructor(videoItemDiv) {
        super();
        this.#videoItemDiv = videoItemDiv;
        if (!this.validate()) {
            throw new Error('Cannot instantiate class HomePageVideoItem when item div has not been fully loaded.');
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
}