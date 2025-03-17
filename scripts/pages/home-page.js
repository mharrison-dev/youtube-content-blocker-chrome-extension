let homePageVideoSet = new VideoItemSetBuilder()
    .setItemSetPath('#primary > ytd-rich-grid-renderer > #contents')
    .setTtitlePath('#video-title-link >> title')
    .setTitleContainerPath('#video-title')
    .setChannelNamePath('#details > #meta > ytd-video-meta-block > #metadata > #byline-container > #channel-name > #container > #text-container > #text >> title')
    .setThumbnailPath('img')
    .build();

let homePagePlaylistSet = new PlaylistItemSetBuilder()
    .setItemSetPath('#contents')
    .setTtitlePath('h3 >> title')
    .setTitleContainerPath('.yt-lockup-metadata-view-model-wiz__title > span')
    .setChannelNamePath('.yt-lockup-metadata-view-model-wiz__text-container > .yt-lockup-metadata-view-model-wiz__metadata > yt-content-metadata-view-model > .yt-content-metadata-view-model-wiz__metadata-row > span >>> innerText')
    .setThumbnailPath('img')
    .build();

let homePageShortSet = new ShortItemSetBuilder()
    .setItemSetPath('#contents > ytd-rich-section-renderer > #content > ytd-rich-shelf-renderer > #dismissible > #contents-container > #contents*')
    .setTtitlePath('h3 > a >> title')
    .setTitleContainerPath('h3 > a > span')
    .setThumbnailPath('img')
    .build();

let contentBlocker = new ContentBlocker();
contentBlocker.observe(homePageVideoSet);
contentBlocker.observe(homePagePlaylistSet);
contentBlocker.observe(homePageShortSet);
contentBlocker.setGetItemDivs(() => document.getElementById('contents'));
contentBlocker.start(); 