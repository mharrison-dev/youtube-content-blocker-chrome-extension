class WatchPagePlaylistItem extends PlaylistItem {
    #playlistItemDiv = undefined;

    constructor(playlistItemDiv) {
        super();
        this.#playlistItemDiv = playlistItemDiv;
    }

    static validate(playlistItemDiv) {
        let titleHeaderTag = playlistItemDiv.querySelector('.yt-lockup-metadata-view-model-wiz__heading-reset');
        if (!titleHeaderTag) {
            return false;
        }
        let title = titleHeaderTag.getAttribute('title');
        if (!title) {
            return false;
        }

        let titleAnchorTag = playlistItemDiv.querySelector('.yt-lockup-metadata-view-model-wiz__title');
        if (!titleAnchorTag) {
            return false;
        }

        let titleSpan = titleAnchorTag.querySelector('span');
        if (!titleSpan) {
            return false;
        }

        let contentMetaDataViewModelTag = playlistItemDiv.querySelector('yt-content-metadata-view-model');
        if (!contentMetaDataViewModelTag) {
            return false;
        }

        let spanForChannelNames = contentMetaDataViewModelTag.querySelector('span');
        if (!spanForChannelNames) {
            return false;
        }

        let channelNames = spanForChannelNames.innerText;
        if (!channelNames) {
            return false;
        }

        let img = playlistItemDiv.querySelector('.yt-core-image');
        if (!img) {
            return false;
        }

        return true;
    }

    getTitle() {
        let titleHeaderTag = this.#playlistItemDiv.querySelector('.yt-lockup-metadata-view-model-wiz__heading-reset');
        let title = titleHeaderTag.getAttribute('title');
        return title;
    }

    getTitleContainer() {
        let titleAnchorTag = this.#playlistItemDiv.querySelector('.yt-lockup-metadata-view-model-wiz__title');
        let titleSpan = titleAnchorTag.querySelector('span');
        return titleSpan;
    }

    getChannelName() {
        let contentMetaDataViewModelTag = this.#playlistItemDiv.querySelector('yt-content-metadata-view-model');
        let spanForChannelNames = contentMetaDataViewModelTag.querySelector('span');
        let channelNames = spanForChannelNames.innerText;
        return channelNames;
    }

    getThumbnail() {
        return this.#playlistItemDiv.querySelector('img');
    }

    static getHTMLTag() {
        return 'yt-lockup-view-model';
    }
}