let watchPageVideoSet = new ItemSet(WatchPageVideoItem);
let watchPagePlaylistSet = new ItemSet(WatchPagePlaylistItem);

let contentBlocker = new ContentBlocker();
contentBlocker.observe(watchPageVideoSet);
contentBlocker.observe(watchPagePlaylistSet);
contentBlocker.setGetItemDivs(() => document.getElementById('related'));
contentBlocker.start();