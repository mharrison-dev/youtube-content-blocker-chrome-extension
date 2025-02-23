let homePageVideoItemFactory = new ItemFactory(HomePageVideoItem, () => document.getElementsByTagName('ytd-rich-grid-media'));
let homePagePlaylistItemFactory = new ItemFactory(HomePagePlaylistItem, () => document.getElementsByTagName('yt-lockup-view-model'));
let homePageShortItemFactory = new ItemFactory(HomePageShortItem, () => document.getElementsByTagName('ytm-shorts-lockup-view-model'));
let getItemDivs = () => document.getElementById('contents');

let contentBlocker = new ContentBlocker();
contentBlocker.addItemFactory(homePageVideoItemFactory);
contentBlocker.addItemFactory(homePagePlaylistItemFactory);
contentBlocker.addItemFactory(homePageShortItemFactory);
contentBlocker.setGetItemDivs(getItemDivs);
contentBlocker.start();