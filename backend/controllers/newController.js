import { buildNew } from "../services/musicContentService.js";
import { getCached, setCached } from "../services/contentCache.js";

export async function getNew(req, res) {
    try {
        const cachedNew = getCached("new");

        if (cachedNew) {
            return res.json(cachedNew);
        }

        const data = await buildNew();

        setCached("new", data);

        res.json(data);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Unable to load New page.",
        });
    }
}