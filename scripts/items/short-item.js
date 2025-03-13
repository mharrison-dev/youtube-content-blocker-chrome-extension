class ShortItem extends Item {
    constructor(itemDiv, titlePath, titleContainerPath, thumbnailPath) {
        super(itemDiv, titlePath, titleContainerPath, null, thumbnailPath);

        let title = this.getTitle();
        if (title == null || title === '') {
            throw new Error('Cannot instantiate ShortItem with an invalid title.');
        }

        let titleContainer = this.getTitleContainer();
        if (titleContainer == null) {
            throw new Error('Cannot instantiate ShortItem with an invalid title container.');
        }

        let channelName = this.getChannelName();
        if (channelName != null) {
            throw new Error('Cannot instantiate ShortItem with an invalid channel name.');
        }

        let thumbnail = this.getThumbnail();
        if (thumbnail == null) {
            throw new Error('Cannot instantiate ShortItem with an invalid thumbnail.');
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