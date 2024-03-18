const express = require('express');
const serverless = require('serverless-http');

const app = express();
const router = express.Router(); // Corrected to Router()

router.get('/', (req, res) => res.send("Welcome to the root"));
router.get("/hello", (req, res) => res.send("Hello World!"));

// Use the router on a specific path. If you want this to be the root, adjust accordingly.
app.use('/', router);

// Export the serverless function handler
module.exports.handler = serverless(app);
