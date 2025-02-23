let watchPageVideoItemFactory = new ItemFactory(WatchPageVideoItem, () => document.getElementsByTagName('ytd-compact-video-renderer'));
let watchPagePlaylistItemFactory = new ItemFactory(WatchPagePlaylistItem, () => document.getElementsByTagName('yt-lockup-view-model'));
let getItemDivs = () => document.getElementById('related');

let contentBlocker = new ContentBlocker();
contentBlocker.addItemFactory(watchPageVideoItemFactory);
contentBlocker.addItemFactory(watchPagePlaylistItemFactory);
contentBlocker.setGetItemDivs(getItemDivs);
contentBlocker.start();