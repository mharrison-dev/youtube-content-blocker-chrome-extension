class HomePageVideoItemFactory extends ItemFactory {
    getItems() {
        let videoItems = [];
        let videoItemDivs = document.getElementsByTagName('ytd-rich-grid-media');
        for (let videoItemDiv of videoItemDivs) {
            try {
                videoItems.push(new HomePageVideoItem(videoItemDiv));
            } catch (error) {
                continue;
            }
        }

        return videoItems;
    }
}