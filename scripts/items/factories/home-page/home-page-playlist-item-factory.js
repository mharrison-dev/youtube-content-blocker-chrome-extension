class HomePagePlaylistItemFactory extends ItemFactory {
    getItems() {
        let playlistItems = [];
        let playlistItemDivs = document.getElementsByTagName('yt-lockup-view-model');
        for (let playlistItemDiv of playlistItemDivs) {
            try {
                playlistItems.push(new HomePagePlaylistItem(playlistItemDiv));
            } catch (error) {
                continue;
            }
        }

        return playlistItems;
    }
}