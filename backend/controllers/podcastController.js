import { buildPodcasts } from "../services/musicContentService.js";
import { getPodcastEpisodes } from "../services/providers/itunesPodcastService.js";
import { getCached, setCached } from "../services/contentCache.js";

export async function getPodcasts(req, res) {
    try {
        const cachedPodcasts = getCached("podcasts");

        if (cachedPodcasts) {
            return res.json(cachedPodcasts);
        }

        const data = await buildPodcasts();

        setCached("podcasts", data);

        res.json(data);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Unable to load Podcasts.",
        });
    }
}

export async function getPodcast(req, res) {
    try {
        const podcast = await getPodcastEpisodes(req.query.feedUrl);

        res.json(podcast);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Unable to load podcast.",
        });
    }
}