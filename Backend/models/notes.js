const mongoose= require('mongoose');
const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        // the use of required is to tell that the field cannot be empty
    },
    description: {
        type: String,
        required: true,


    },
    tag: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Note = mongoose.model('Note', notesSchema);
module.exports = Note;