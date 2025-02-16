let watchPageItemSet = undefined;
let watchPageItemSetObserver = undefined;
KeywordPersistence
    .loadKeywords()
    .then((keywords) => {
        watchPageItemSet = new ItemSet();
        watchPageItemSet.addItemFactory(new WatchPageVideoItemFactory());
        watchPageItemSet.addItemFactory(new WatchPagePlaylistItemFactory());
        watchPageItemSet.setTitleKeywords(keywords.titleKeywords);
        watchPageItemSet.setChannelNameKeywords(keywords.channelNameKeywords);
        watchPageItemSetObserver = new WatchPageItemSetObserver(() => watchPageItemSet.updateItems());
    });