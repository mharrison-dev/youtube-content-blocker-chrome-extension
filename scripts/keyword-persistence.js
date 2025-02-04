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
        );

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
});