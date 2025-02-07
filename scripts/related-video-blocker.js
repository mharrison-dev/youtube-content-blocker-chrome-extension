// Keyword Loading Logic
let titleKeywords = [];
let channelNameKeywords = [];

chrome.runtime.onMessage.addListener((message) => {
    if (message.localStorage === 'updated') {
        loadKeywords()
            .then(manageVideoRenderers);
    }
});

function loadKeywords() {
    return chrome.storage.local
        .get(['titleKeywords', 'channelNameKeywords'])
        .then((result) => {
            titleKeywords = result.titleKeywords;
            channelNameKeywords = result.channelNameKeywords;
        });
}

// Mutation Observer Logic
function createMutationObserverForRelatedVideoRenderer(callback) {
    let bodyTag = document.getElementsByTagName('body')[0];
    let config = { attributes: true, subtree: true };
    let waitForRelatedVideoRendererToLoad = (mutationList, auxiliaryObserver) => {
        let htmlCollection = document.getElementsByTagName('ytd-watch-next-secondary-results-renderer');
        if (htmlCollection.length > 0) {
            let relatedVideoRenderer = htmlCollection[0];
            let mainObserver = new MutationObserver(callback);
            mainObserver.observe(relatedVideoRenderer, config);
            auxiliaryObserver.disconnect();
        }
    };

    let auxiliaryObserver = new MutationObserver(waitForRelatedVideoRendererToLoad);
    auxiliaryObserver.observe(bodyTag, config);
}

// Video Renderer Logic
function manageVideoRenderers() {
    let videoRenderers = document.getElementsByTagName('ytd-compact-video-renderer');
    for (let videoRenderer of videoRenderers) {
        try {
            let videoRendererManager = new RelatedVideoRendererManager(videoRenderer);

            if (shouldHideTitle(videoRendererManager)) {
                videoRendererManager.hideTitle();
            }

            if (shouldHideThumbnail(videoRendererManager)) {
                videoRendererManager.hideThumbnail();
            }

            if (shouldShowTitleAndThumbnail(videoRendererManager)) {
                videoRendererManager.showTitle();
                videoRendererManager.showThumbnail();
            }
        } catch (error) {
            continue;
        }
    }

    function shouldHideTitle(videoRendererManager) {
        if (videoRendererManager.isHiddingTitle()) {
            return false;
        }

        if (videoRendererManager.includesSomeKeywordsInTitle(titleKeywords)) {
            return true;
        }

        return videoRendererManager.includesSomeKeywordsInChannelName(channelNameKeywords);
    }

    function shouldHideThumbnail(videoRendererManager) {
        if (videoRendererManager.isHiddingThumbnail()) {
            return false;
        }

        return videoRendererManager.isHiddingTitle();
    }

    function shouldShowTitleAndThumbnail(videoRendererManager) {
        if (videoRendererManager.isShowingTitle()) {
            return false;
        }

        if (videoRendererManager.includesSomeKeywordsInTitle(titleKeywords)) {
            return false;
        }

        if (videoRendererManager.includesSomeKeywordsInChannelName(channelNameKeywords)) {
            return false;
        }

        return videoRendererManager.isHiddingTitle();
    }
}

class RelatedVideoRendererManager extends VideoRendererManager {
    constructor(videoRenderer) {
        super();
        this.videoRenderer = videoRenderer;
        if (!this.#canAccessNecessaryAttributesAndElements()) {
            throw new Error('Cannot instantiate class RelatedVideoRendererManager when ytd-compact-video-renderer has not been fully loaded.');
        }
    }

    getTitle() {
        let titleSpan = this.videoRenderer.querySelector('#video-title');
        let title = titleSpan.getAttribute('title');
        return title;
    }

    getTitleContainer() {
        let titleSpan = this.videoRenderer.querySelector('#video-title');
        return titleSpan;
    }

    getChannelName() {
        let channelNameFormattedString = this.videoRenderer.querySelector('.style-scope ytd-channel-name').querySelector('#text');
        let channelName = channelNameFormattedString.getAttribute('title');
        return channelName;
    }

    getThumbnail() {
        return this.videoRenderer.querySelector('.yt-core-image');
    }

    #canAccessNecessaryAttributesAndElements() {
        let channelNameFormattedString = this.videoRenderer.querySelector('.style-scope ytd-channel-name').querySelector('#text');
        if (!channelNameFormattedString) {
            return false;
        }

        return this.getTitleContainer() && this.getThumbnail();
    }
}

// Main Logic
loadKeywords();
createMutationObserverForRelatedVideoRenderer(manageVideoRenderers);