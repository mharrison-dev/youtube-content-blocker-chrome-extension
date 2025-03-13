let homePageVideoSet = new VideoItemSet(
    '#primary > ytd-rich-grid-renderer > #contents',
    '#video-title-link >> title',
    '#video-title',
    '#details > #meta > ytd-video-meta-block > #metadata > #byline-container > #channel-name > #container > #text-container > #text >> title',
    'img');

let homePagePlaylistSet = new PlaylistItemSet(
    '#contents',
    'h3 >> title',
    '.yt-lockup-metadata-view-model-wiz__title > span',
    '.yt-lockup-metadata-view-model-wiz__text-container > .yt-lockup-metadata-view-model-wiz__metadata > yt-content-metadata-view-model > .yt-content-metadata-view-model-wiz__metadata-row > span >>> innerText',
    'img'
);

let homePageShortSet = new ShortItemSet(
    '#contents > ytd-rich-section-renderer > #content > ytd-rich-shelf-renderer > #dismissible > #contents-container > #contents*',
    'h3 > a >> title',
    'h3 > a > span',
    'img'
);

let contentBlocker = new ContentBlocker();
contentBlocker.observe(homePageVideoSet);
contentBlocker.observe(homePagePlaylistSet);
contentBlocker.observe(homePageShortSet);
contentBlocker.setGetItemDivs(() => document.getElementById('contents'));
contentBlocker.start(); 