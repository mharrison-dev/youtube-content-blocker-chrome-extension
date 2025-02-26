class VideoItem extends Item {
    constructor() {
        super();
        if (new.target === VideoItem) {
            throw new Error('Cannot instantiate abstract class VideoItem directly.');
        }
    }

    static getHTMLTag() {
        throw new Error('Must implement "getHTMLTag" method.');
    }

    getTitle() {
        throw new Error('Must implement "getTitle" method.');
    }

    getTitleContainer() {
        throw new Error('Must implement "getTitleContainer" method.');
    }

    getChannelName() {
        throw new Error('Must implement "getChannelName" method.');
    }

    getThumbnail() {
        throw new Error('Must implement "getThumbnail" method.');
    }
}