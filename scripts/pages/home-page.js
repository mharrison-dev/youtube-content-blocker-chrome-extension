let homePageVideoSet = new ItemSet(HomePageVideoItem, () => document.getElementsByTagName('ytd-rich-grid-media'));
let homePagePlaylistSet = new ItemSet(HomePagePlaylistItem, () => document.getElementsByTagName('yt-lockup-view-model'));
let homePageShortSet = new ItemSet(HomePageShortItem, () => document.getElementsByTagName('ytm-shorts-lockup-view-model'));
let getItemDivs = () => document.getElementById('contents');

let contentBlocker = new ContentBlocker();
contentBlocker.observe(homePageVideoSet);
contentBlocker.observe(homePagePlaylistSet);
contentBlocker.observe(homePageShortSet);
contentBlocker.setGetItemDivs(getItemDivs);
contentBlocker.start();