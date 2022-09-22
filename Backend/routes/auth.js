const express = require('express')
const User = require('../models/users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { check } = require('express-validator');
var bcrypt = require('bcryptjs');

//Create a user using: POST '/api/auth'. Doesn't require auth, no login required
//Route 1: Route to create a new user
router.post('/createuser',[
    //all the checks and validation will be here
    //the name of the user must be at least 3 characters long
 body('name',"Enter a valid name").isLength({min: 3}),
 // email must be an email
 body('email', "Enter a valid email").isEmail(),
 check('password')
    .isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
    .matches(/\d/)
    .withMessage('must contain a number'),
], async(req, res)=>{

})

module.exports = router;