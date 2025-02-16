class WatchPageVideoItem extends Item {
    #videoItemDiv = undefined;

    constructor(videoItemDiv) {
        super();
        this.#videoItemDiv = videoItemDiv;
        if (!this.validate()) {
            throw new Error('Cannot instantiate class WatchPageVideoItem when item div has not been fully loaded.');
        }
    }

    getTitle() {
        let titleSpan = this.#videoItemDiv.querySelector('#video-title');
        let title = titleSpan.getAttribute('title');
        return title;
    }

    getTitleContainer() {
        let titleSpan = this.#videoItemDiv.querySelector('#video-title');
        return titleSpan;
    }

    getChannelName() {
        let channelNameFormattedString = this.#videoItemDiv.querySelector('.style-scope ytd-channel-name').querySelector('#text');
        let channelName = channelNameFormattedString.getAttribute('title');
        return channelName;
    }

    getThumbnail() {
        return this.#videoItemDiv.querySelector('.yt-core-image');
    }
}