class WatchPageItemSetObserver extends ItemSetObserver {
    constructor(callback) {
        super(callback);
    }

    getItemDivSet() {
        let htmlCollection = document.getElementsByTagName('ytd-watch-next-secondary-results-renderer');
        return (htmlCollection.length > 0)
            ? htmlCollection[0]
            : null;
    }
}