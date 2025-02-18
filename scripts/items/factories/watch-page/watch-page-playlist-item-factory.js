class WatchPagePlaylistItemFactory extends ItemFactory {
    getItems() {
        let playlistItems = [];
        let playlistItemDivs = document.getElementsByTagName('yt-lockup-view-model');
        for (let playlistItemDiv of playlistItemDivs) {
            if (WatchPagePlaylistItem.validate(playlistItemDiv)) {
                let playlistItem = new WatchPagePlaylistItem(playlistItemDiv);
                playlistItems.push(playlistItem);
            }
        }

        return playlistItems;
    }
}