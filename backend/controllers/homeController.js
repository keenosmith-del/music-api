import { buildHome } from "../services/musicContentService.js";
import { getCached, setCached } from "../services/contentCache.js";

export async function getHome(req, res) {
    try {
        const cachedHome = getCached("home");

        if (cachedHome) {
            return res.json(cachedHome);
        }

        const home = await buildHome();

        setCached("home", home);

        res.json(home);
    } catch (err) {
        console.error(err);

        res.status(500).json({
            message: "Unable to load Home.",
        });
    }
}