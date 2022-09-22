//require mongoose
const mongoose= require('mongoose');
//Design a Note Schema
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
    //tag is used to define what type a particular note is
    tag: {
        type: String,
        default:"General",
        //General is the default tag any notes you save will have General tag unless you change it
    },
    date: {
        type: Date,
        default: Date.now
    }
});
//we connect Note to notesSchema
const Note = mongoose.model('Note', notesSchema);
//we export the Note Schema
module.exports = Note;