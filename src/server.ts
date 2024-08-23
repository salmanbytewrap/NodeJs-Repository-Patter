import * as dotenv from "dotenv";
dotenv.config();

import express from 'express';
import router from './router';
import config from './config';
import connectDB from './helpers/db';

// Load environment variables from .env file
const app = express();
const port = config.PORT
// Use built-in middleware for parsing JSON bodies
app.use(express.json());

// Use built-in middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Testing router for server running
app.get('/', (req, res) => {
    res.send(`Server is running on port ${port}`);
})

app.use(router) // Bind Main Router File with App

// Connecting DB and Starting Server
connectDB().then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
});