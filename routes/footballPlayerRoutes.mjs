import express from "express";
import { players } from "../data/footballPlayers.mjs"

let router = express.Router();

// @route:  GET api/users
// @desc:   Gets all users
// @access: Public
router.route('/').get((req, res) => {
    const links = [
        {
            href: 'players/:id',
            rel: ':id',
            type: 'GET',
        },
    ];

    res.json({ players, links });
})

// @route: POST api/players
// @desc: Adds new player to DB
// @access: Public
router.post('/', (req, res, next) => {
    if (req.body.name && req.body.position && req.body.team) {
        if (players.find((p) => p.name == req.body.name)) {
            next(error(400, 'Player is already in the database.'));
        }

        const player = {
            player: players.length + 1,
            name: req.body.name,
            position: req.body.position,
            team: req.body.team,
        };

        players.push(player); // Push new player to DB
        res.json(players[players.length - 1]);
    } else res.json({ error: "Something wrong with your data"}); // Send error to user
})

// @route: GET api/users/:id
// @desc: Gets one player
// @access: Public
router.get('/:id', (req, res, next) => {
    const links = [
        {
            href: `/${req.params.id}`,
            rel: '',
            type: 'PATCH',
        },
        {
            href: `/${req.params.id}`,
            rel: '',
            type: 'DELETE',
        },
    ];

    const player = players.find((u) => u.player == req.params.id);

    if (player) res.json({ player, links});
    else next();
});

// Export to the default router
export default router;