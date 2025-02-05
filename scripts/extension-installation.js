chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local
        .set(
            {
                'titleKeywords': [],
                'channelNameKeywords': []
            }
        )
});