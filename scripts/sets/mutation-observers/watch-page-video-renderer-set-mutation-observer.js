class RelatedVideoRendererSetMutationObserver extends VideoRendererSetMutationObserver {
    constructor(callback) {
        super(callback);
    }

    getVideoRendererSet() {
        let htmlCollection = document.getElementsByTagName('ytd-watch-next-secondary-results-renderer');
        return (htmlCollection.length > 0)
            ? htmlCollection[0]
            : null;
    }
}