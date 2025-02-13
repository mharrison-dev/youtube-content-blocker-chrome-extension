class WatchPagePlaylistItemFactory extends ItemFactory {
    getItems() {
        let playlistItems = [];
        let playlistItemDivs = document.getElementsByTagName('ytd-compact-video-renderer');
        for (let playlistItemDiv of playlistItemDivs) {
            try {
                playlistItems.push(new WatchPagePlaylistItem(playlistItemDiv));
            } catch (error) {
                continue;
            }
        }

        return playlistItems;
    }
}