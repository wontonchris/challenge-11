// Dependencies
const express = require('express');
const path = require('path');
const fs = require('fs');
const api = require('./routes/index.js')
const uniqid = require('uniqid');

//Set up express app
const app = express();
const PORT = process.env.PORT || 3000;

//HTML Routes
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', api);

//GET /notes - Should return the notes.html file.
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
}
);

//GET listen for requests
app.listen(PORT, () => {    
    console.log(`App listening on PORT: ${PORT}`);
}
);