// Keyword Loading Logic
let titleKeywords = [];
let channelNameKeywords = [];

chrome.runtime.onMessage.addListener((message) => {
    if (message.localStorage === 'updated') {
        loadKeywords()
            .then(() => {
                relatedVideoRendererSetManager.setTitleKeywords(titleKeywords);
                relatedVideoRendererSetManager.setChannelNameKeywords(channelNameKeywords);
            })
            .then(() => relatedVideoRendererSetManager.updateVideoRenderers());
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
let relatedVideoRendererSetManager = undefined;
loadKeywords()
    .then(() => {
        relatedVideoRendererSetManager = new RelatedVideoRendererSetManager();
        relatedVideoRendererSetManager.setTitleKeywords(titleKeywords);
        relatedVideoRendererSetManager.setChannelNameKeywords(channelNameKeywords);
        createMutationObserverForRelatedVideoRenderer(() => relatedVideoRendererSetManager.updateVideoRenderers());
    });