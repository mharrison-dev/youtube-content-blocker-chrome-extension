// Mutation Observer Logic
class RelatedVideoRendererSetMutationObserver extends VideoRendererSetMutationObserver {
    constructor(callback) {
        super(callback);
    }

    getVideoRendererSet() {
        let htmlCollection = document.getElementsByTagName('ytd-watch-next-secondary-results-renderer');
        return (htmlCollection.length > 0)
            ? htmlCollection[0]
            : null;
    }
}

// Video Renderer Logic
class RelatedVideoRendererSetManager extends VideoRendererSetManager {
    constructor() {
        super();
    }

    getVideoRendererManagers() {
        let videoRendererManagers = [];
        let videoRenderers = document.getElementsByTagName('ytd-compact-video-renderer');
        for (let videoRenderer of videoRenderers) {
            try {
                videoRendererManagers.push(new RelatedVideoRendererManager(videoRenderer));
            } catch (error) {
                continue;
            }
        }

        return videoRendererManagers;
    }
}

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

// Main Logic
let relatedVideoRendererSetManager = undefined;
let relatedVideoRendererSetMutationObserver = undefined;
chrome.storage.local
    .get(['titleKeywords', 'channelNameKeywords'])
    .then((keywords) => {
        relatedVideoRendererSetManager = new RelatedVideoRendererSetManager();
        relatedVideoRendererSetManager.setTitleKeywords(keywords.titleKeywords);
        relatedVideoRendererSetManager.setChannelNameKeywords(keywords.channelNameKeywords);
        relatedVideoRendererSetMutationObserver = new RelatedVideoRendererSetMutationObserver(() => relatedVideoRendererSetManager.updateVideoRenderers());
    });