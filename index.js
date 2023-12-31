const express = require('express');
const path = require('path');
const { v4: uuid } = require('uuid');
const methodOverride = require('method-override');
const app = express();
const log = console.log;
const port = 5000;
const localHost = 'localhost';
let comments = [
    {   
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delete your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysayswoof',
        comment: 'woof woof woof'
    }
]

// set view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// body parser. The body of the incoming payload of a post request must be parsed.
// The default is undefined
app.use(express.urlencoded({extended: true}));

// body parser for json. Must use this if incoming request is json data
app.use(express.json());

// Using method-override. This will enable us to use a patch request as a post method so that the 
// browser can complete our request
app.use(methodOverride('_method'));

// Index route. Example of getting all comments. GET request
app.get('/comments', (req, res) => {
    res.render('comments/index', {comments});
});

// New route. Get a new comment form. GET request
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

// Create route. Create a new comment and redirect
app.post('/comments', (req, res) => {
    const {username, comment} = req.body;
    comments.push({username, comment, id: uuid()});
    res.redirect('/comments');
});

// Show route. This route will get a specific comment based on the id
app.get('/comments/:id', (req, res) => {
    const {id} = req.params; // id is in the req.params
    const comment = comments.find(c => c.id === id); // getting the comment matching hard coded data
    res.render('comments/show', {comment});
});

// Edit route. Get request to get the edit a comment form.
app.get('/comments/:id/edit', (req, res) => {
    const {id} = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', {comment});
});

// Patch route. This route is for updating a portion of something. Use Put if you want to 
// update everything. This is best practice
app.patch('/comments/:id', (req, res) => {
    const {id} = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
});

// Delete route. This route is for deleting something. In our case to delete a comment
app.delete('/comments/:id', (req, res) => {
    const {id} = req.params;
    comments = comments.filter(c => c.id != id);
    res.redirect('/comments');
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