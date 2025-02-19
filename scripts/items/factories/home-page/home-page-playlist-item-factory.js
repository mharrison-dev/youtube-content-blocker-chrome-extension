class HomePagePlaylistItemFactory extends ItemFactory {
    getItems() {
        let playlistItems = [];
        let playlistItemDivs = document.getElementsByTagName('yt-lockup-view-model');
        for (let playlistItemDiv of playlistItemDivs) {
            if (HomePagePlaylistItem.validate(playlistItemDiv)) {
                let playlistItem = new HomePagePlaylistItem(playlistItemDiv);
                playlistItems.push(playlistItem);
            }
        }

        return playlistItems;
    }
}