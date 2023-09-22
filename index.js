const express = require('express');
const path = require('path');
const app = express();
const log = console.log;

const port = 5000;
const localHost = 'localhost';

app.get('/', (req, res) => {
    res.send('We are at the home page');
});

app.listen(port, localHost, () => {
    log(`Server running at https://${localHost}:${port}/`);
});