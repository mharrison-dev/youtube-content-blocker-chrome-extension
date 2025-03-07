class SubscriptionPageShortItem extends ShortItem {
    #shortItemDiv = undefined;

    constructor(shortItemDiv) {
        super();
        this.#shortItemDiv = shortItemDiv;
    }

    static validate(shortItemDiv) {
        let metadataDivTag = shortItemDiv.querySelector('.shortsLockupViewModelHostOutsideMetadata');
        if (!metadataDivTag) {
            return false;
        }

        let titleAnchorTag = metadataDivTag.querySelector('a');
        if (!titleAnchorTag) {
            return false;
        }

        let title = titleAnchorTag.getAttribute('title');
        if (!title) {
            return false;
        }

        let titleSpanTag = metadataDivTag.querySelector('span');
        if (!titleSpanTag) {
            return false;
        }

        let imgTag = shortItemDiv.querySelector('img');
        if (!imgTag) {
            return false;
        }

        let titleWithoutWhitespace = title.replace(/\s*/g, '');
        let displayedTitleWithoutWhitespace = titleSpanTag.innerText.replace(/\s*/g, '');
        if (titleWithoutWhitespace !== displayedTitleWithoutWhitespace && displayedTitleWithoutWhitespace !== 'BLOCKED') {
            return false;
        }

        return true;
    }

    getTitle() {
        let metadataDivTag = this.#shortItemDiv.querySelector('.shortsLockupViewModelHostOutsideMetadata');
        let titleAnchorTag = metadataDivTag.querySelector('a');
        let title = titleAnchorTag.getAttribute('title');
        return title;
    }

    getTitleContainer() {
        let metadataDivTag = this.#shortItemDiv.querySelector('.shortsLockupViewModelHostOutsideMetadata');
        let titleSpanTag = metadataDivTag.querySelector('span');
        return titleSpanTag;
    }

    getThumbnail() {
        return this.#shortItemDiv.querySelector('img');
    }

    static getHTMLTag() {
        return 'ytm-shorts-lockup-view-model';
    }
}