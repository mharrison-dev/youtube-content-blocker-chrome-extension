class HomePageVideoItemFactory extends ItemFactory {
    getItems() {
        let videoItems = [];
        let videoItemDivs = document.getElementsByTagName('ytd-rich-grid-media');
        for (let videoItemDiv of videoItemDivs) {
            if (HomePageVideoItem.validate(videoItemDiv)) {
                let videoItem = new HomePageVideoItem(videoItemDiv);
                videoItems.push(videoItem);
            }
        }

        return videoItems;
    }
}