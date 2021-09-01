const fs = require('fs')
const path = require('path')

function createNewNote(body, notesArray) {
    const note = body;
    notesArray.push(note);
    new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname,'../db/db.json'), JSON.stringify({ notes: notesArray }, null, 2), err => {
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

function deleteNote(id, notesArray) {
    const index = notesArray.findIndex(note => note.id === id);
    notesArray.splice(index, 1)
    new Promise((resolve, reject) => {
        fs.writeFile(path.join(__dirname,'../db/db.json'), JSON.stringify({ notes: notesArray }, null, 2), err => {
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

module.exports = {
    createNewNote,
    deleteNote
};
