let subscriptionPageVideoSet = new ItemSet(SubscriptionPageVideoItem);

let contentBlocker = new ContentBlocker();
contentBlocker.observe(subscriptionPageVideoSet);
contentBlocker.setGetItemDivs(() => document.getElementById('contents'));
contentBlocker.start();