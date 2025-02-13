class WatchPageVideoItemFactory extends ItemFactory {
    getItems() {
        let videoItems = [];
        let videoItemDivs = document.getElementsByTagName('ytd-compact-video-renderer');
        for (let videoItemDiv of videoItemDivs) {
            try {
                videoItems.push(new WatchPageVideoItem(videoItemDiv));
            } catch (error) {
                continue;
            }
        }

        return videoItems;
    }
}