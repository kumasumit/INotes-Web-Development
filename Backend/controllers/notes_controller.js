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

//Action 3: to update a note by a logged-in user
module.exports.updateNote = async function (req, res) {
    try {
        //first destructure the req.body
        const {title, description, tag} = req.body;
        //create a new note Object
        const newNote = {};
        if(title){
            newNote.title = title;
        }
        if(description){
            newNote.description = description;
        }
        if(tag){
            newNote.tag = tag;
        }
        //find the note to be updated and update it
        let note = await Note.findById(req.params.id);
        if(!note){
            //if no note exists for the req.params id, then
            return res.status(404).send("Note not found");
        }
        //if the note exists
        if(note.user.toString() !== req.user.id){
            //if the userId stored in noted schema is different from the req.user id,
            //means person trying to update the note is not the same person trying to update the note
            //we return 401, request forbidden
            return res.status(401).send("Not Allowed");
        }
        //if the note exists and the logged-in user is the same user trying to update the note, then
        note = await Note.findByIdAndUpdate(req.params.id, {$set: newNote}, {new: true});
        //by doing new true, if we have a new note, it will also be created
        res.json({note});
        //at last we send the updated note
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
}