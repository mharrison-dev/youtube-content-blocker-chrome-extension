let watchPageVideoSet = new ItemSet(WatchPageVideoItem, () => document.getElementsByTagName('ytd-compact-video-renderer'));
let watchPagePlaylistSet = new ItemSet(WatchPagePlaylistItem, () => document.getElementsByTagName('yt-lockup-view-model'));
let getItemDivs = () => document.getElementById('related');

let contentBlocker = new ContentBlocker();
contentBlocker.observe(watchPageVideoSet);
contentBlocker.observe(watchPagePlaylistSet);
contentBlocker.setGetItemDivs(getItemDivs);
contentBlocker.start();