// Import
import express from "express";

// Instance of express
const app = express();
let PORT = 3000;

// Middleware

// Route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Catch all route for incorrect inputs
app.get('*', (req, res) => {
    res.status(404).send('Error: Page Not Found!')
})

// Listen
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})