import { buildHome } from "../services/musicContentService.js";

export async function getHome(req, res) {
    try {
        const home = await buildHome();

        res.json(home);
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Unable to load Home.",
        });
    }
}