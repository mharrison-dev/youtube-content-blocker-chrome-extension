let subscriptionPageVideoSet = new VideoItemSet(
    '#primary > ytd-rich-grid-renderer > #contents',
    '#video-title-link >> title',
    '#video-title',
    '#channel-name > #container > #text-container > #text >> title',
    'img');

let subscriptionPageShortSet = new ShortItemSet(
    '#primary > ytd-rich-grid-renderer > #contents > ytd-rich-section-renderer > #content > ytd-rich-shelf-renderer > #dismissible > #contents-container > #contents',
    'h3 > a >> title',
    'h3 > a > span',
    'img'
);

let contentBlocker = new ContentBlocker();
contentBlocker.observe(subscriptionPageVideoSet);
contentBlocker.observe(subscriptionPageShortSet);
contentBlocker.setGetItemDivs(() => document.getElementById('contents'));
contentBlocker.start();