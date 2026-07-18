import { buildNew } from "../services/musicContentService.js";

export async function getNew(req, res) {
    try {
        const data = await buildNew();

        res.json(data);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Unable to load New page.",
        });
    }
}