class VideoItem extends Item {
    constructor(itemDiv, titlePath, titleContainerPath, channelNamePath, thumbnailPath) {
        super(itemDiv, titlePath, titleContainerPath, channelNamePath, thumbnailPath);

        let title = this.getTitle();
        if (title == null || title === "") {
            throw new Error('Cannot instantiate VideoItem with an invalid title.');
        }

        let titleContainer = this.getTitleContainer();
        if (titleContainer == null) {
            throw new Error('Cannot instantiate VideoItem with an invalid title container.');
        }

        let channelName = this.getChannelName();
        if (channelName == null || channelName === "") {
            throw new Error('Cannot instantiate VideoItem with an invalid channel name.');
        }

        let thumbnail = this.getThumbnail();
        if (thumbnail == null) {
            throw new Error('Cannot instantiate VideoItem with an invalid thumbnail.');
        }
    }

    show() {
        this.getThumbnail().removeAttribute('style');
        this.getThumbnail().setAttribute('style', 'background-color: transparent');
        this.getTitleContainer().innerText = this.getTitle();
    }
}