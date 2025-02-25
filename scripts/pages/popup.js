class Popup {
    start() {
        this.#loadKeywords();
        this.#setupSaveButton();
    }

    #setupSaveButton() {
        let saveButton = document.getElementById('save-button');
        saveButton.addEventListener('click', () => {
            let keywords = this.#getKeywordsFromEntries();
            KeywordPersistence
                .save(keywords.titleKeywords, keywords.channelNameKeywords)
                .then(() => this.#sendNotificationAboutLocalStorageUpdate());
        });
    }

    #sendNotificationAboutLocalStorageUpdate() {
        chrome.tabs
            .query({ url: ['https://www.youtube.com/watch?v=*', 'https://www.youtube.com/'] })
            .then((tabs) => {
                if (tabs) {
                    for (let tab of tabs) {
                        chrome.tabs.sendMessage(tab.id, this.#getKeywordsFromEntries());
                    }
                }
            });
    }

    #getKeywordsFromEntries() {
        let titleKeywordEntry = document.getElementById('title-keywords');
        let titleKeywords = this.#getKeywordsFromEntry(titleKeywordEntry);

        let channelNameKeywordEntry = document.getElementById('channel-name-keywords');
        let channelNameKeywords = this.#getKeywordsFromEntry(channelNameKeywordEntry);

        let keywords = { titleKeywords: titleKeywords, channelNameKeywords: channelNameKeywords };
        return keywords;
    }

    #getKeywordsFromEntry(entry) {
        let emptyStringRegex = /^\s*$/;
        if (emptyStringRegex.test(entry.value)) {
            return [];
        }

        let keywords = entry.value
            .split(',')
            .map((keyword) => keyword.trim());

        return keywords;
    }

    #loadKeywords() {
        KeywordPersistence
            .loadKeywords()
            .then((keywords) => this.#addKeywordsToEntries(keywords));
    }

    #addKeywordsToEntries(keywords) {
        let titleKeywordEntry = document.getElementById('title-keywords');
        this.#addKeywordsToEntry(keywords.titleKeywords, titleKeywordEntry);

        let channelNameKeywordEntry = document.getElementById('channel-name-keywords');
        this.#addKeywordsToEntry(keywords.channelNameKeywords, channelNameKeywordEntry);
    }

    #addKeywordsToEntry(keywords, entry) {
        for (let i = 0; i < keywords.length; i++) {
            entry.value += keywords[i];
            if (i < keywords.length - 1) {
                entry.value += ', ';
            }
        }
    }
}

let popup = new Popup();
popup.start();