let subscriptionPageVideoSet = new VideoItemSetBuilder()
    .setItemSetPath('#primary > ytd-rich-grid-renderer > #contents')
    .setTtitlePath('#video-title-link >> title')
    .setTitleContainerPath('#video-title')
    .setChannelNamePath('#channel-name > #container > #text-container > #text >> title')
    .setThumbnailPath('img')
    .build();

let subscriptionPageShortSet = new ShortItemSetBuilder()
    .setItemSetPath('#primary > ytd-rich-grid-renderer > #contents > ytd-rich-section-renderer > #content > ytd-rich-shelf-renderer > #dismissible > #contents-container > #contents')
    .setTtitlePath('h3 > a >> title')
    .setTitleContainerPath('h3 > a > span')
    .setThumbnailPath('img')
    .build();

let contentBlocker = new ContentBlocker();
contentBlocker.observe(subscriptionPageVideoSet);
contentBlocker.observe(subscriptionPageShortSet);
contentBlocker.setGetItemDivs(() => document.getElementById('contents'));
contentBlocker.start();