// Document Elements
let titleKeywordEntry = document.getElementById('title-keywords');
let channelNameKeywordEntry = document.getElementById('channel-name-keywords');
let saveButton = document.getElementById('save-button');

// Keyword Saving Logic
saveButton.addEventListener('click', function saveKeywords() {
    chrome.storage.local
        .set(
            {
                'titleKeywords': extractKeywords(titleKeywordEntry.value),
                'channelNameKeywords': extractKeywords(channelNameKeywordEntry.value)
            }
        ).then(sendNotificationAboutLocalStorageUpdate);

    function extractKeywords(string) {
        let emptyStringRegex = /^\s*$/;
        if (emptyStringRegex.test(string)) {
            return [];
        }

        let keywords = string
            .split(',')
            .map((keyword) => keyword.trim());

        return keywords;
    }

    function sendNotificationAboutLocalStorageUpdate() {
        chrome.tabs
            .query({ url: 'https://www.youtube.com/watch?v=*' })
            .then((tabs) => {
                if (tabs) {
                    for (let tab of tabs) {
                        chrome.tabs.sendMessage(tab.id, { localStorage: 'updated' });
                    }
                }
            });
    }
});

// Keyword Loading Logic
function loadKeywords() {
    chrome.storage.local
        .get(['titleKeywords', 'channelNameKeywords'])
        .then((result) => {
            addKeywordsToEntry(result.titleKeywords, titleKeywordEntry);
            addKeywordsToEntry(result.channelNameKeywords, channelNameKeywordEntry);
        });

    function addKeywordsToEntry(keywords, entry) {
        for (let i = 0; i < keywords.length; i++) {
            entry.value += keywords[i];
            if (i < keywords.length - 1) {
                entry.value += ', ';
            }
        }
    }
}

// Main Logic
loadKeywords();