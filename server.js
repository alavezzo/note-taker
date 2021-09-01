const express = require('express');
const fs = require('fs');
const path = require('path');
const PORT = process.env.PORT || 3001
const uniqid = require('uniqid')


const app = express();

// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());
app.use(express.static('public'))

const { notes } = require('./db/db')


function deleteNote(id, notesArray) {
    const index = notesArray.findIndex(note => note.id === id);
    notesArray.splice(index, 1)
    new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname,'./db/db.json'), JSON.stringify({ notes: notesArray }, null, 2), err => {
            if (err) {
                reject(err);
                console.log(err);
                return;
            }
            resolve ({
                ok: true,                   
                message: 'File created!'
            });
        });
    });
    return index;
}

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname,'./db/db.json'), JSON.stringify({ notes: notesArray }, null, 2), err => {
            if (err) {
                reject(err);
                console.log(err);
                return;
            }
            resolve ({
                ok: true,                   
                message: 'File created!'
            });
        });
    });
};


app.get('/api/notes', (req, res) => {
    let results = notes;
    res.json(results);
});

app.delete('/api/notes/:id', (req, res) => {
    deleteNote(req.params.id, notes);
    res.json(notes);
});

app.post('/api/notes', (req, res) => {
    req.body.id = uniqid();
    const note = createNewNote(req.body, notes);
    res.json(note);
})

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
});

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
});



app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
})

