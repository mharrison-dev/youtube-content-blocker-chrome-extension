class WatchPageVideoItemFactory extends ItemFactory {
    getItems() {
        let videoItems = [];
        let videoItemDivs = document.getElementsByTagName('ytd-compact-video-renderer');
        for (let videoItemDiv of videoItemDivs) {
            if (WatchPageVideoItem.validate(videoItemDiv)) {
                let videoItem = new WatchPageVideoItem(videoItemDiv);
                videoItems.push(videoItem);
            }
        }

        return videoItems;
    }
}