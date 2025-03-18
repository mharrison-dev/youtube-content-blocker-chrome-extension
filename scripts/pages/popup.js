class Popup {
    #titleKeywordEntry;
    #channelNameKeywordEntry;
    #saveButton;

    constructor() {
        this.#titleKeywordEntry = document.getElementById('title-keywords');
        this.#channelNameKeywordEntry = document.getElementById('channel-name-keywords');
        this.#saveButton = document.getElementById('save-button');
    }

    start() {
        this.#disableSaveButton();
        this.#setupSaveButton();
        this.#loadKeywordsFromLocalStorage()
            .then(() => this.#enableSaveButton());
    }

    #disableSaveButton() {
        this.#saveButton.disabled = true;
    }

    #setupSaveButton() {
        this.#saveButton.addEventListener('click', () => {
            this.#saveKeywordsToLocalStorage()
                .then(() => this.#notifyPagesAboutKeywordUpdate());
        });
    }

    #saveKeywordsToLocalStorage() {
        let titleKeywords = this.#getKeywordsFromTitleKeywordEntry();
        let channelNameKeywords = this.#getKeywordsFromChannelNameKeywordEntry();
        return KeywordPersistence.save(titleKeywords, channelNameKeywords);
    }

    #notifyPagesAboutKeywordUpdate() {
        chrome.tabs
            .query({ url: ['https://www.youtube.com/watch?v=*', 'https://www.youtube.com/', 'https://www.youtube.com/feed/subscriptions'] })
            .then((tabs) => {
                if (tabs) {
                    for (let tab of tabs) {
                        let titleKeywords = this.#getKeywordsFromTitleKeywordEntry();
                        let channelNameKeywords = this.#getKeywordsFromChannelNameKeywordEntry();
                        chrome.tabs.sendMessage(tab.id, { titleKeywords: titleKeywords, channelNameKeywords: channelNameKeywords });
                    }
                }
            });
    }

    #getKeywordsFromTitleKeywordEntry() {
        return this.#titleKeywordEntry.value
            .split(',')
            .map((keyword) => keyword.trim())
            .filter((keyword) => keyword.length > 0);
    }

    #getKeywordsFromChannelNameKeywordEntry() {
        return this.#channelNameKeywordEntry.value
            .split(',')
            .map((keyword) => keyword.trim())
            .filter((keyword) => keyword.length > 0);
    }

    #loadKeywordsFromLocalStorage() {
        return KeywordPersistence
            .loadKeywords()
            .then((keywords) => this.#addKeywordsToEntries(keywords));
    }

    #addKeywordsToEntries(keywords) {
        this.#titleKeywordEntry.value = keywords.titleKeywords.join(', ');
        this.#channelNameKeywordEntry.value = keywords.channelNameKeywords.join(', ');
    }

    #enableSaveButton() {
        this.#saveButton.disabled = false;
    }
}

let popup = new Popup();
popup.start();