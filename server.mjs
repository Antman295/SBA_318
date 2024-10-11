// Import
import express from "express";
import footballPlayerRoutes from './routes/footballPlayerRoutes.mjs';
import bodyParser from "body-parser";

// Data import
import { players } from './data/footballPlayers.mjs'

// Instance of express
const app = express();
let PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended: true}))

// Routes
app.use('/api/players', footballPlayerRoutes); // Route for players data

// Error Handling


// Catch all route for incorrect inputs
app.get('*', (req, res) => {
    res.status(404).send('Data not found in database!')
})

// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})