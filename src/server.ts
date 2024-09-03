import * as dotenv from "dotenv";
dotenv.config();

import express from 'express';
import * as tracer from "tracer";
import statusMonitor from 'express-status-monitor';
import router from './router';
import config from './config';
import connectDB from './helpers/db';

// Load environment variables from .env file
const app = express();
const port = config.PORT;
const logger = tracer.colorConsole();


app.use(statusMonitor()); // Monitor Server Status

// Use built-in middleware for parsing JSON bodies
app.use(express.json());

// Use built-in middleware for parsing URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Testing router for server running
app.get('/', (req, res) => {
    res.send(`Server is running on port ${port}`);
})
if (config.NODE_ENV === "development") {
    app.use(express.text());
    app.use((req, res, next) => {
      logger.trace(`${req.method} ${req.url}`);
      if (
        (/json/i.test(req.headers?.["content-type"] ?? '') &&
          Object.keys(req.body).length > 0) ||
        req.body.length > 0
      ) {
        logger.debug(req.body);
      }
      next();
    });
  }
  
app.use(router) // Bind Main Router File with App


// Connecting DB and Starting Server
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    })
});
