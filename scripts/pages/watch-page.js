let watchPageItemSet = undefined;
let watchPageItemSetObserver = undefined;
KeywordPersistence
    .loadKeywords()
    .then((keywords) => {
        watchPageItemSet = new ItemSet();
        watchPageItemSet.addItemFactory(new ItemFactory(WatchPageVideoItem, () => document.getElementsByTagName('ytd-compact-video-renderer')));
        watchPageItemSet.addItemFactory(new ItemFactory(WatchPagePlaylistItem, () => document.getElementsByTagName('yt-lockup-view-model')));
        watchPageItemSet.setTitleKeywords(keywords.titleKeywords);
        watchPageItemSet.setChannelNameKeywords(keywords.channelNameKeywords);
        watchPageItemSetObserver = new ItemSetObserver(() => watchPageItemSet.updateItems(), () => {
            let htmlCollection = document.getElementsByTagName('ytd-watch-next-secondary-results-renderer');
            return (htmlCollection.length > 0)
                ? htmlCollection[0]
                : null;
        });
    });