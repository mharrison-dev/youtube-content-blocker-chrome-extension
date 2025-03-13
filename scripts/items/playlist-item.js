class PlaylistItem extends Item {
    constructor(itemDiv, titlePath, titleContainerPath, channelNamePath, thumbnailPath) {
        super(itemDiv, titlePath, titleContainerPath, channelNamePath, thumbnailPath);

        let title = this.getTitle();
        if (title == null || title === "") {
            throw new Error('Cannot instantiate PlaylistItem with an invalid title.');
        }

        let titleContainer = this.getTitleContainer();
        if (titleContainer == null) {
            throw new Error('Cannot instantiate PlaylistItem with an invalid title container.');
        }

        let channelName = this.getChannelName();
        if (channelName == null || channelName === "") {
            throw new Error('Cannot instantiate PlaylistItem with an invalid channel name.');
        }

        let thumbnail = this.getThumbnail();
        if (thumbnail == null) {
            throw new Error('Cannot instantiate PlaylistItem with an invalid thumbnail.');
        }
    }

    hide() {
        this.getThumbnail().setAttribute('style', 'display: none');
        this.getTitleContainer().innerText = 'BLOCKED';
    }

    show() {
        this.getThumbnail().removeAttribute('style');
        this.getTitleContainer().innerText = this.getTitle();
    }

    isHidden() {
        let styleAttribute = this.getThumbnail().getAttribute('style');
        if (styleAttribute === null) {
            return false;
        }

        return styleAttribute.includes('display: none') && this.getTitleContainer().innerText === 'BLOCKED';
    }
}