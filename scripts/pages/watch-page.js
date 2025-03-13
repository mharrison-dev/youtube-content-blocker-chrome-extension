let watchPageVideoSet = new VideoItemSet(
    '#related > ytd-watch-next-secondary-results-renderer > #items ?> ytd-item-section-renderer > #contents',
    '#video-title >> title',
    '#video-title',
    '#metadata > #byline-container > #channel-name > #container > #text-container > #text >> title',
    'img');

let watchPagePlaylistSet = new PlaylistItemSet(
    '#related > ytd-watch-next-secondary-results-renderer > #items',
    'h3 >> title',
    'h3 > a > span',
    'yt-content-metadata-view-model > div > span >>> innerText',
    'img'
);

let contentBlocker = new ContentBlocker();
contentBlocker.observe(watchPageVideoSet);
contentBlocker.observe(watchPagePlaylistSet);
contentBlocker.setGetItemDivs(() => document.getElementById('related'));
contentBlocker.start();