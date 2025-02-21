let homePageItemSet = undefined;
let homePageItemSetObserver = undefined;
KeywordPersistence
    .loadKeywords()
    .then((keywords) => {
        homePageItemSet = new ItemSet();
        homePageItemSet.addItemFactory(new ItemFactory(HomePageVideoItem, () => document.getElementsByTagName('ytd-rich-grid-media')));
        homePageItemSet.addItemFactory(new ItemFactory(HomePagePlaylistItem, () => document.getElementsByTagName('yt-lockup-view-model')));
        homePageItemSet.addItemFactory(new ItemFactory(HomePageShortItem, () => document.getElementsByTagName('ytm-shorts-lockup-view-model')));
        homePageItemSet.setTitleKeywords(keywords.titleKeywords);
        homePageItemSet.setChannelNameKeywords(keywords.channelNameKeywords);
        homePageItemSetObserver = new HomePageItemSetObserver(() => homePageItemSet.updateItems());
    });