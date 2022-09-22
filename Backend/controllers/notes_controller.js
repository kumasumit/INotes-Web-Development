const Note = require('../models/notes');
//Action 1: to get all notes of a logged-in user
module.exports.fetchAllNotes = async function (req, res) {
    try {
        //find all the notes of the logged in user
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }

}

//Action 2: to create a note by a logged-in user
module.exports.createNote = async function (req, res) {
    try {
        //create a new note for a logged-in user
        const note = await Note.create({
            user: req.user.id,
            title: req.body.title,
            description: req.body.description,
            tag: req.body.tag
        })
        note.save();
        res.json(note);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
}