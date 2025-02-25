class WatchPageVideoItem extends Item {
    #videoItemDiv = undefined;

    constructor(videoItemDiv) {
        super();
        this.#videoItemDiv = videoItemDiv;
    }

    static validate(videoItemDiv) {
        let titleSpan = videoItemDiv.querySelector('#video-title');
        if (!titleSpan) {
            return false;
        }

        let title = titleSpan.getAttribute('title');
        if (!title) {
            return false;
        }

        let channelNameFormattedString = videoItemDiv.querySelector('.style-scope ytd-channel-name').querySelector('#text');
        if (!channelNameFormattedString) {
            return false;
        }

        let channelName = channelNameFormattedString.getAttribute('title');
        if (!channelName) {
            return false;
        }

        let img = videoItemDiv.querySelector('.yt-core-image');
        if (!img) {
            return false;
        }

        return true;
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

    static getHTMLTag() {
        return 'ytd-compact-video-renderer';
    }
}