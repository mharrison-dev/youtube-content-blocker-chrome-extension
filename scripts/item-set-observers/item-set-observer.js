class ItemSetObserver {
    #config = { attributes: true, subtree: true };
    #callback = undefined;
    #mainObserver = undefined;
    #auxiliaryObserver = undefined;

    constructor(callback) {
        if (new.target === ItemSetObserver) {
            throw new Error('Cannot instantiate abstract class ItemSetObserver directly.');
        }

        this.#callback = callback;
        this.#createAuxiliaryObserver();
    }

    #createAuxiliaryObserver() {
        this.#auxiliaryObserver = new MutationObserver(() => this.#createMainObserver());
        let bodyTag = document.getElementsByTagName('body')[0];
        this.#auxiliaryObserver.observe(bodyTag, this.#config);
    }

    #createMainObserver() {
        let itemDivSet = this.getItemDivSet();
        if (itemDivSet) {
            this.#mainObserver = new MutationObserver(this.#callback);
            this.#mainObserver.observe(itemDivSet, this.#config);
            this.#auxiliaryObserver.disconnect();
        }
    }
}