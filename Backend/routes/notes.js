const express = require('express')
const router = express.Router()
const fetchUser = require("../middlewares/fetch_user_middleware");
//include the notes_controller
const notesController = require('../controllers/notes_controller');
//include the notes_validator_middleware
const notesValidatorMiddleware = require('../middlewares/notes_validator_middleware');

//Route 1: Route to get all the notes
//get all the notes of logged in user using: GET '/api/notes/fetchallnotes'.
// requires auth, login required
router.get('/fetchallnotes', fetchUser,notesController.fetchAllNotes);
//here fetchUser is the middleware


//Route 2: Route to add a new note
//Create a a note using: POST '/api/notes/addnote'.
// requires auth, login required
router.post('/addnote', fetchUser,notesValidatorMiddleware.createNoteValidator, notesController.createNote);
//here fetchUser is the middleware

//Route 3: Route to update an existing note
//Update an existing note using: PUT '/api/notes/updatenote/:id'.
// requires auth, login required
router.put('/updatenote/:id', fetchUser, notesController.updateNote);
//here fetchUser is the middleware

//Route 4: Route to delete an existing note
//Delete an existing note using: DELETE '/api/notes/deletenote/:id'.
// requires auth, login required
router.delete('/deletenote/:id', fetchUser, notesController.deleteNote);
//here fetchUser is the middleware
module.exports = router