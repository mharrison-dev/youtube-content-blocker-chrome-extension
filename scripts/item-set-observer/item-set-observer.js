class ItemSetObserver {
    #config = { attributes: true, subtree: true };
    #callback = undefined;
    #mainObserver = undefined;
    #auxiliaryObserver = undefined;
    #getItemDivs = undefined;

    constructor(callback, getItemDivs) {
        this.#callback = callback;
        this.#getItemDivs = getItemDivs;
        this.#createAuxiliaryObserver();
    }

    #createAuxiliaryObserver() {
        this.#auxiliaryObserver = new MutationObserver(() => this.#createMainObserver());
        let bodyTag = document.getElementsByTagName('body')[0];
        this.#auxiliaryObserver.observe(bodyTag, this.#config);
    }

    #createMainObserver() {
        let itemDivs = this.#getItemDivs();
        if (itemDivs) {
            this.#mainObserver = new MutationObserver(this.#callback);
            this.#mainObserver.observe(itemDivs, this.#config);
            this.#auxiliaryObserver.disconnect();
        }
    }
}