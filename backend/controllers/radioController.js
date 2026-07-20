import { buildRadio } from "../services/musicContentService.js";
import { getCached, setCached } from "../services/contentCache.js";

export async function getRadio(req, res) {
    try {
        const cachedRadio = getCached("radio");

        if (cachedRadio) {
            return res.json(cachedRadio);
        }

        const data = await buildRadio();

        setCached("radio", data);

        res.json(data);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Unable to load Radio.",
        });
    }
}