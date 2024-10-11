import express from 'express';
import { restaurants } from '../data/restaurants.mjs';
import error from '../utilities/error.mjs';

let router = express.Router();

//@route: GET api/restaurants
//@desc: Gets all restaurants
//@access: Public
router.get('/', (req, res) => {
    const links = [
        {
            href: 'restaurants/:place',
            rel: ':place',
            type: 'GET',
        },
    ];
    
    res.json({ restaurants, links });
});

// @route:  GET api/restaurants/:place
// @desc    Gets one restaurant
// @access: Public
router.get('/:place', (req, res, next) => {
    const links = [
      {
        href: `/${req.params.place}`,
        rel: '',
        type: 'PATCH',
      },
      {
        href: `/${req.params.place}`,
        rel: '',
        type: 'DELETE',
      },
    ];
  
    let restaurant = restaurants.find((r) => r.place == req.params.place);
  
    if (place) res.json({ place, links });
    else next();
  });