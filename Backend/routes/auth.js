const express = require('express')
const User = require('../models/Users');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { check } = require('express-validator');
var bcrypt = require('bcryptjs');

//Create a user using: POST '/api/auth'. Doesn't require auth, no login required
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
 // Finds the validation errors in this request and wraps them in an object with handy functions
 const errors = validationResult(req);
 //if the errors is not empty, it means we need to send those errors
 if (!errors.isEmpty()) {
   return res.status(400).json({ errors: errors.array() });
 }
 try{
 //check whether the user already exists for a given email
 //we search the user collection by email and check if already user is defined for req.body.email
 let user = await User.findOne({email: req.body.email})
 //  console.log(user);

  if(user){
     //if user with given email already exists
     res.status(400).json({error: "Sorry a user with this email already exists"});
  }


  const salt = await bcrypt.genSaltSync(10);
  const securePassword = await bcrypt.hash(req.body.password, salt);

  //Create a new user
  user = await User.create({
     name: req.body.name,
     email: req.body.email,
     password: securePassword,
   })
   res.json(user);
 }catch(error){
    console.error(error.message);
    res.status(500).send("Some Error Occured");
 }
})

module.exports = router;