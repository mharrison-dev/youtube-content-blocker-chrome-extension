class ItemFactory {
    constructor() {
        if (new.target === ItemFactory) {
            throw new Error('Cannot instantiate abstract class ItemFactory directly.');
        }
    }

    getItems() {
        throw new Error('"getItems" method must be implemented by a subclass.');
    }
}