import { buildSearch } from "../services/musicContentService.js";

export async function search(req, res) {
    try {
        const { q = "" } = req.query;

        const data = await buildSearch(q);

        res.json(data);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Unable to search music.",
        });
    }
}