class RelatedVideoRendererSetManager extends VideoRendererSetManager {
    constructor() {
        super();
    }

    getVideoRendererManagers() {
        let videoRendererManagers = [];
        let videoRenderers = document.getElementsByTagName('ytd-compact-video-renderer');
        for (let videoRenderer of videoRenderers) {
            try {
                videoRendererManagers.push(new RelatedVideoRendererManager(videoRenderer));
            } catch (error) {
                continue;
            }
        }

        let videoPlaylistRenderers = document.getElementsByTagName('yt-lockup-view-model');
        for (let videoPlaylistRenderer of videoPlaylistRenderers) {
            try {
                videoRendererManagers.push(new RelatedVideoPlaylistRendererManager(videoPlaylistRenderer));
            } catch (error) {
                continue;
            }
        }

        return videoRendererManagers;
    }
}