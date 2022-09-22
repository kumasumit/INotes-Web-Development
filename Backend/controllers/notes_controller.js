const Note = require('../models/notes');

module.exports.fetchAllNotes = async function(req, res){
  //find all the notes of the logged in user
  const notes = await Note.find({user: req.user.id});
  res.json(notes);
}