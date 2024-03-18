const express = require('express')
const serverless = require('serverless-http')

const app = express()
const router = express.router()

router.get('/', (req, res) => res.send("welcome to the root"))
router.get("/hello", (req, res) => res.send("Hello World!"));

app.use('/.netlify/functions/api', router)
module.exports.handler = serverless(app);
