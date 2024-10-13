// Import
import express from "express";
import footballPlayerRoutes from './routes/footballPlayerRoutes.mjs';
import restaurantRoutes from './routes/restaurantRoutes.mjs';
import reviewRoutes from './routes/reviewRoutes.mjs';
import bodyParser from "body-parser";
import error from './utilities/error.mjs'
import fs from 'fs';


// Instance of express
const app = express();
let PORT = 3000;

// Middleware

// Serving Static Files 
app.use(express.static('./styles'));

// Body Parsing
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({extended: true}));

// View Engine
app.engine('file', (filePath, options, callback) => {
    fs.readFile(filePath, (err, content) => {
        if (err) return callback(err);

        if (options.allPlayers) {
            let result = '';

            options.allPlayers.forEach((el) => {
                result += `<h2>Name: ${el.name}<h2><h3>Species: ${el.species}</h3><h3>Age: ${el.age}</h3><a href="/api/animal/${el.id}"><button>More Info</button></a><br><br>`;
            });

            const rendered = content.toString().replace('#content#', result);

            return callback(null, rendered);
        } else {
            const rendered = content
                .toString()
                .replaceAll('#name#', `${options.name}`)
                .replace('#position#', `${options.position}`)
                .replace('#team#', `${options.team}`)
                .replace('#player#', options.player);

            return callback(null, rendered);
        }
        
    });
});

app.set('views', './views'); // Specifies the views directory
app.set('view engine', 'file'); // Registers the template engine
// Routes
app.use('/api/players', footballPlayerRoutes); // Route for players data
app.use('/api/restaurants', restaurantRoutes); // Route for restaurant data
app.use('/api/reviews', reviewRoutes); // Route for review data

// Middleware Error Handling
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});


app.use((req, res, next) => {
    next(error(404, "Data not found in database!"))
})

// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})