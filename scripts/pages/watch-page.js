let watchPageItemSet = undefined;
let watchPageItemSetObserver = undefined;
chrome.storage.local
    .get(['titleKeywords', 'channelNameKeywords'])
    .then((keywords) => {
        watchPageItemSet = new WatchPageItemSet();
        watchPageItemSet.setTitleKeywords(keywords.titleKeywords);
        watchPageItemSet.setChannelNameKeywords(keywords.channelNameKeywords);
        watchPageItemSetObserver = new WatchPageItemSetObserver(() => watchPageItemSet.updateItems());
    });