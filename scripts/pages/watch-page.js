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