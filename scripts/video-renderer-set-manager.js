class VideoRendererSetManager {
    #titleKeywords = undefined;
    #channelNameKeywords = undefined;

    constructor() {
        if (new.target === VideoRendererSetManager) {
            throw new Error('Cannot instantiate abstract class VideoRendererSetManager directly.');
        }

        chrome.runtime.onMessage.addListener((keywords) => {
            this.setTitleKeywords(keywords.titleKeywords);
            this.setChannelNameKeywords(keywords.channelNameKeywords);
            this.updateVideoRenderers();
        });        
    }

    updateVideoRenderers() {
        let videoRendererManagers = this.getVideoRendererManagers();
        for (let videoRendererManager of videoRendererManagers) {
            if (this.#shouldHideTitle(videoRendererManager)) {
                videoRendererManager.hideTitle();
            }

            if (this.#shouldHideThumbnail(videoRendererManager)) {
                videoRendererManager.hideThumbnail();
            }

            if (this.#shouldShowTitleAndThumbnail(videoRendererManager)) {
                videoRendererManager.showTitle();
                videoRendererManager.showThumbnail();
            }
        }
    }

    #shouldHideTitle(videoRendererManager) {
        if (videoRendererManager.isHiddingTitle()) {
            return false;
        }

        if (videoRendererManager.includesSomeKeywordsInTitle(this.#titleKeywords)) {
            return true;
        }

        return videoRendererManager.includesSomeKeywordsInChannelName(this.#channelNameKeywords);
    }

    #shouldHideThumbnail(videoRendererManager) {
        if (videoRendererManager.isHiddingThumbnail()) {
            return false;
        }

        return videoRendererManager.isHiddingTitle();
    }

    #shouldShowTitleAndThumbnail(videoRendererManager) {
        if (videoRendererManager.isShowingTitle()) {
            return false;
        }

        if (videoRendererManager.includesSomeKeywordsInTitle(this.#titleKeywords)) {
            return false;
        }

        if (videoRendererManager.includesSomeKeywordsInChannelName(this.#channelNameKeywords)) {
            return false;
        }

        return videoRendererManager.isHiddingTitle();
    }

    setTitleKeywords(keywords) {
        this.#titleKeywords = keywords;
    }

    setChannelNameKeywords(keywords) {
        this.#channelNameKeywords = keywords;
    }
}