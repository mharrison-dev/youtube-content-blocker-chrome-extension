let homePageItemSet = undefined;
let homePageItemSetObserver = undefined;
KeywordPersistence
    .loadKeywords()
    .then((keywords) => {
        homePageItemSet = new ItemSet();
        homePageItemSet.addItemFactory(new HomePageVideoItemFactory());
        homePageItemSet.addItemFactory(new HomePagePlaylistItemFactory());
        homePageItemSet.addItemFactory(new HomePageShortItemFactory());
        homePageItemSet.setTitleKeywords(keywords.titleKeywords);
        homePageItemSet.setChannelNameKeywords(keywords.channelNameKeywords);
        homePageItemSetObserver = new HomePageItemSetObserver(() => homePageItemSet.updateItems());
    });