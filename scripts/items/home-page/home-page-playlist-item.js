class HomePagePlaylistItem extends PlaylistItem {
    #playlistItemDiv = undefined;

    constructor(playlistItemDiv) {
        super();
        this.#playlistItemDiv = playlistItemDiv;
        if (!this.#canAccessNecessaryAttributesAndElements()) {
            throw new Error('Cannot instantiate class HomePagePlaylistItem when ytd-compact-video-renderer has not been fully loaded.');
        }
    }

    getTitle() {
        let titleHeaderTag = this.#playlistItemDiv.querySelector('h3');
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

    #canAccessNecessaryAttributesAndElements() {
        let titleHeaderTag = this.#playlistItemDiv.querySelector('h3');
        if (!titleHeaderTag) {
            return false;
        }

        let titleAnchorTag = this.#playlistItemDiv.querySelector('.yt-lockup-metadata-view-model-wiz__title');
        if (!titleAnchorTag) {
            return false;
        }

        let contentMetaDataViewModelTag = this.#playlistItemDiv.querySelector('yt-content-metadata-view-model');
        if (!contentMetaDataViewModelTag) {
            return false;
        }

        let thumbnail = this.#playlistItemDiv.querySelector('img');
        if (!thumbnail) {
            return false;
        }

        return true;
    }
}