import express from 'express';
import { reviews } from "../data/reviews.mjs";
import error from '../utilities/error.mjs';
let router = express.Router();

// @route: GET api/reviews
// @desc Gets all reviews
// @access: Public
router.get('/', (req, res) => {
    const links = [
        {
            href: 'reviews/:id',
            rel: ':id',
            type: 'GET',
        },
    ];

    res.json ({ reviews, links });
});

// @route: GET api/reviews/name/:name
// @desc Get all reviews from that person with that name
// @access: Public
router.get('/name/:name', (req, res, next) => {
    let all = [];

    reviews.forEach((p) => {
        if (p.name == req.params.name) {
            let copy = p;

            all.push(copy);
        }
    });

    if (all.length > 0) res.json({ all });
    else next(error(400, 'That person does not exist or has not posted a review'));
});

export default router;