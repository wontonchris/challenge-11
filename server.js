// Dependancies
const express = require('express');
const path = require('path');
const fs = require('fs');

// Set up Express App
const app = express();

// Set up PORT
const PORT = process.env.PORT || 3001;

// Set up Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Routes

// HTML Routes
app.get('/', (req, res) => res.sendFile(path.join(__dirname, './public/index.html')));
app.get('/notes', (req, res) => res.sendFile(path.join(__dirname, './public/notes.html')));

// API Routes
app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
}
);

app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
        if (err) throw err;
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
            if (err) throw err;
            res.json(newNote);
        });
    });
}
);

// app listen
app.listen(PORT, () => console.log(` http://localhost:${PORT}`));
