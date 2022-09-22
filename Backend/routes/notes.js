const express = require('express')
const router = express.Router()
const fetchUser = require("../middlewares/fetch_user_middleware");
//include the notes_controller
const notesController = require('../controllers/notes_controller');

//Route 1: Route to get all the notes
//Create a user using: GET '/api/notes/fetchallnotes'.
// requires auth, login required
router.get('/fetchallnotes', fetchUser, notesController.fetchAllNotes);
//here fetchUser is the middleware

module.exports = router