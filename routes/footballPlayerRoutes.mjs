import express from "express";
import { players } from "../data/footballPlayers.mjs"

let router = express.Router();

// @route:  GET api/players
// @desc:   Gets all players
// @access: Public
router.route('/').get((req, res) => {
    const links = [
        {
            href: 'players/:player',
            rel: ':player',
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
            next(error(409, 'Player is already in the database.'));
        }

        // Create a new player with data
        const player = {
            player: players.length + 1,
            name: req.body.name,
            position: req.body.position,
            team: req.body.team,
        };

        players.push(player); // Push new player to DB
        res.json(players[players.length - 1]);
    } else next(error(400, "Something's wrong with your data")); // Send error to user
})

// @route: GET api/players/:player
// @desc: Gets one player
// @access: Public
router.get('/:player', (req, res, next) => {
    const links = [
        {
            href: `/${req.params.player}`,
            rel: '',
            type: 'PATCH',
        },
        {
            href: `/${req.params.player}`,
            rel: '',
            type: 'DELETE',
        },
    ];

    const player = players.find((p) => p.player == req.params.player);

    if (player) res.json({ player, links });
    else next();
});

//@route: PATCH api/players/:player
//@desc: Update specific player
//@access: Public
router.delete('/:player', (req, res, next) => {
    const player = players.find((p, i) => {
        if (p.player = req.params.player) {
            for (const key in req.body) {
                players[i][key] = req.body[key];
            }
            return true;
        }
    });

    if (player) res.json(player);
    else next();
})


//@route: PATCH api/players/:player
//@desc: Delete specific player
//@access: Public
router.delete('/:player', (req, res, next) => {
    const player = players.find((p, i) => {
        if (p.player = req.params.player) {
            players.splice(i, 1);
            return true;
        }
    });

    if (player) res.json(player);
    else next();
})

// Export to the default router
export default router;