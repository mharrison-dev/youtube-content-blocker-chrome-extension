let watchPageVideoSet = new VideoItemSetBuilder()
    .setItemSetPath('#related > ytd-watch-next-secondary-results-renderer > #items ?> ytd-item-section-renderer > #contents')
    .setTtitlePath('#video-title >> title')
    .setTitleContainerPath('#video-title')
    .setChannelNamePath('#metadata > #byline-container > #channel-name > #container > #text-container > #text >> title')
    .setThumbnailPath('img')
    .build();

let watchPagePlaylistSet = new PlaylistItemSetBuilder()
    .setItemSetPath('#related > ytd-watch-next-secondary-results-renderer > #items')
    .setTtitlePath('h3 >> title')
    .setTitleContainerPath('h3 > a > span')
    .setChannelNamePath('yt-content-metadata-view-model > div > span >>> innerText')
    .setThumbnailPath('img')
    .build();

let contentBlocker = new ContentBlocker();
contentBlocker.manage(watchPageVideoSet);
contentBlocker.manage(watchPagePlaylistSet);