class KeywordPersistence {
    static save(titleKeywords, channelNameKeywords) {
        return chrome.storage.local
            .set(
                {
                    'titleKeywords': titleKeywords,
                    'channelNameKeywords': channelNameKeywords
                }
            );
    }

    static loadKeywords() {
        return chrome.storage.local.get(['titleKeywords', 'channelNameKeywords']);
    }
}