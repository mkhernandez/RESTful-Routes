const express = require('express');
const path = require('path');
const app = express();
const log = console.log;

const port = 5000;
const localHost = 'localhost';

// set view engine
app.set('views', path.join(__dirname, 'views'));

// body parser. The body of the incoming payload of a post request must be parsed.
// The default is undefined
app.use(express.urlencoded({extended: true}));

// body parser for json. Must use this if incoming request is json data
app.use(express.json());

app.get('/', (req, res) => {
    res.send('We are at the home page');
});

app.get('/tacos', (req, res) => {
    res.send('GET /tacos response');
});

// Simple post request that will take the req.body and display the particular
// incoming values for the user
app.post('/tacos', (req, res) => {
    const {meat, amount} = req.body; 
    res.send(`Okay, here are your ${amount} ${meat} tacos. Enjoy!`);
});

app.listen(port, localHost, () => {
    log(`Server running at http://${localHost}:${port}/`);
});