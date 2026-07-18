import { buildPodcasts } from "../services/musicContentService.js";

export async function getPodcasts(req, res) {
    try {
        const data = await buildPodcasts();

        res.json(data);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Unable to load Podcasts.",
        });
    }
}