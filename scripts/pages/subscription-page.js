let subscriptionPageVideoSet = new ItemSet(SubscriptionPageVideoItem);
let subscriptionPageShortSet = new ItemSet(SubscriptionPageShortItem);

let contentBlocker = new ContentBlocker();
contentBlocker.observe(subscriptionPageVideoSet);
contentBlocker.observe(subscriptionPageShortSet);
contentBlocker.setGetItemDivs(() => document.getElementById('contents'));
contentBlocker.start();