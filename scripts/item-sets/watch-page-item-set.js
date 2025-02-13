class WatchPageItemSet extends ItemSet {
    constructor() {
        super();
    }

    getItems() {
        let items = [];
        let itemDivs = document.getElementsByTagName('ytd-compact-video-renderer');
        for (let itemDiv of itemDivs) {
            try {
                items.push(new WatchPageVideoItem(itemDiv));
            } catch (error) {
                continue;
            }
        }

        let playlistItemDivs = document.getElementsByTagName('yt-lockup-view-model');
        for (let playlistItemDiv of playlistItemDivs) {
            try {
                items.push(new WatchPagePlaylistItem(playlistItemDiv));
            } catch (error) {
                continue;
            }
        }

        return items;
    }
}