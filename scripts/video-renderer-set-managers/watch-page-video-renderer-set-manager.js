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

        return videoRendererManagers;
    }
}