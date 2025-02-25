let homePageVideoSet = new ItemSet(HomePageVideoItem);
let homePagePlaylistSet = new ItemSet(HomePagePlaylistItem);
let homePageShortSet = new ItemSet(HomePageShortItem);

let contentBlocker = new ContentBlocker();
contentBlocker.observe(homePageVideoSet);
contentBlocker.observe(homePagePlaylistSet);
contentBlocker.observe(homePageShortSet);
contentBlocker.setGetItemDivs(() => document.getElementById('contents'));
contentBlocker.start();