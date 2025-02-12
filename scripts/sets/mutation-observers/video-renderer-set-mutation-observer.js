class VideoRendererSetMutationObserver {
    #config = { attributes: true, subtree: true };
    #callback = undefined;
    #mainObserver = undefined;
    #auxiliaryObserver = undefined;

    constructor(callback) {
        if (new.target === VideoRendererSetMutationObserver) {
            throw new Error('Cannot instantiate abstract class VideoRendererSetMutationObserver directly.');
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
        let videoRendererSet = this.getVideoRendererSet();
        if (videoRendererSet) {
            this.#mainObserver = new MutationObserver(this.#callback);
            this.#mainObserver.observe(videoRendererSet, this.#config);
            this.#auxiliaryObserver.disconnect();
        }
    }
}