const express = require('express');
const PORT = process.env.PORT || 3001

const app = express();

const { notes } = require('./db/db')

function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.id) {
        filteredResults = filteredResults.filter(notes => notes.id === query.id)
    }
    return filteredResults;
}
app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results)
});

app.listen(PORT, () => {
    console.log(`API server now on port 3001!`);
})
