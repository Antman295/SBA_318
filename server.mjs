// Import
import express from "express";
import footballPlayerRoutes from './routes/footballPlayerRoutes.mjs';

// Data import
import { players } from './data/footballPlayers.mjs'

// Instance of express
const app = express();
let PORT = 3000;

// Middleware

// Routes
app.use('/players', footballPlayerRoutes); // Route for players data

// Catch all route for incorrect inputs
app.get('*', (req, res) => {
    res.status(404).send('Error: Page Not Found!')
})

// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})