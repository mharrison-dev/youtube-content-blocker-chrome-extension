class HomePageItemSetObserver extends ItemSetObserver {
    constructor(callback) {
        super(callback);
    }

    getItemDivSet() {
        return document.getElementById('contents');
    }
}