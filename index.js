const express = require('express');
const path = require('path');
const app = express();
const log = console.log;

const port = 5000;
const localHost = 'localhost';

app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    res.send('We are at the home page');
});

app.get('/tacos', (req, res) => {
    res.send('GET /tacos response');
});

app.post('/tacos', (req, res) => {
    res.send('POST /tacos response');
});

app.listen(port, localHost, () => {
    log(`Server running at https://${localHost}:${port}/`);
});