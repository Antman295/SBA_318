import express from "express";
import { players } from "../data/footballPlayers.mjs"

let router = express.Router();

// @route: GET api/players
// @desc: Gets all players
// @access: Public
router.get('/', (req, res) => {
    res.json(players);
});

// Export to the default router
export default router;