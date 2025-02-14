let homePageItemSet = undefined;
let homePageItemSetObserver = undefined;
chrome.storage.local
    .get(['titleKeywords', 'channelNameKeywords'])
    .then((keywords) => {
        homePageItemSet = new ItemSet();
        homePageItemSet.addItemFactory(new HomePageVideoItemFactory());
        homePageItemSet.addItemFactory(new HomePagePlaylistItemFactory());
        homePageItemSet.setTitleKeywords(keywords.titleKeywords);
        homePageItemSet.setChannelNameKeywords(keywords.channelNameKeywords);
        homePageItemSetObserver = new HomePageItemSetObserver(() => homePageItemSet.updateItems());
    });