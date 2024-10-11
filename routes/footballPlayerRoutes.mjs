import express from "express";
import { players } from "../data/footballPlayers.mjs"

let router = express.Router();

// @route: GET api/players
// @desc: Gets all players
// @access: Public
router.get('/', (req, res) => {
    res.json(players);
});

// @route: POST api/players
// @desc: Adds new player to DB
// @access: Public
router.post('/', (req, res) => {
    if (req.body.name && req.body.position && req.body.team) {
        if (players.find((p) => p.name == req.body.name)) {
            res.json({ error: "Player already exist in the database"});
        }

        const player = {
            player: players[players.length - 1].id + 1,
            name: req.body.name,
            position: req.body.position,
            team: req.body.team,
            still_player: [{
                status: req.body.status,
                retired: req.body.retired,
            }]
        };

        players.push(player); // Push new player to DB
        res.json(players[players.length - 1]);
    } else res.json({ error: "Something wrong with your data"}); // Send error to user
})
// Export to the default router
export default router;