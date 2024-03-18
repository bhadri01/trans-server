const express = require('express');
const translate = require('translate-google');
const app = express();
const port = 3000;

app.use(express.json());

const supportedLanguages = {
    en: 'English',
    es: 'Spanish',
    fr: 'French',
    de: 'German',
    zh: 'Chinese',
    // Add more languages as needed
};

app.post('/translate', (req, res) => {
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

app.get('/source-lang', (req, res) => {
    res.json(supportedLanguages);
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});