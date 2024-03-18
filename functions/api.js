const express = require('express');
const serverless = require('serverless-http');
const translate = require('translate-google');

const app = express();
const router = express.Router(); // Corrected to Router()

const supportedLanguages = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    zh: 'Chinese',
    // Add more languages as needed
};

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

router.get('/', (req, res) => res.send("Welcome to the root"));
router.post('/translate', (req, res) => {
    const { text, from = 'auto', to = 'es' } = req.body;
    if (text && to) {
        translate(text, {
            from,
            to
        })
            .then(translatedText => {
                res.status(200).json({ message: translatedText });
            })
            .catch(err => {
                res.status(500).json({ message: err.message, status: false });
            });
    } else {
        res.status(400).json({ message: "text required", status: false });
    }
});

router.get('/lang', (req, res) => {
    res.json(supportedLanguages);
});
// Use the router on a specific path. If you want this to be the root, adjust accordingly.
app.use('/.netlify/functions/api', router);

// Export the serverless function handler
module.exports.handler = serverless(app);
