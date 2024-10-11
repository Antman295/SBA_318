// Import
import express from "express";
import footballPlayerRoutes from './routes/footballPlayerRoutes.mjs';
import bodyParser from "body-parser";


// Instance of express
const app = express();
let PORT = 3000;

// Middleware
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json({extended: true}))

// Routes
app.use('/api/players', footballPlayerRoutes); // Route for players data

// Middleware Error Handling
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ error: err.message });
});

app.use((req, res, next) => {
    next(error(404, "Data not found in database!"))
})

// Catch all route for incorrect inputs
app.get('*', (req, res) => {
    res.status(404).send('Invalid link!')
})

// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})