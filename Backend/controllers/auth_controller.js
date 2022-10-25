//here we handle all the imports/requires
const User = require('../models/users');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const {JWT_TOKEN} = require("./../constants");

//here all the imports/requires end

//Create a user using: POST '/api/auth'. Doesn't require auth, no login required
//1. Controller to Create a new User
module.exports.createUser = async function (req, res) {
    try {
        //check whether the user already exists for a given email
        //we search the user collection by email and check if already user is defined for req.body.email
        let user = await User.findOne({ email: req.body.email })
        //  console.log(user);

        if (user) {
            //if user with given email already exists
            //then throw error and return
           return res.status(400).json({ error: "Sorry a user with this email already exists" });
        }

        //if user with the email address does not already exist,
        //we hash the password with bcrypt.js by adding salt
        const salt = await bcrypt.genSaltSync(10);
        const securePassword = await bcrypt.hash(req.body.password, salt);

        //Create a new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword,
            //here we store the hashed password not the plain text password
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_TOKEN);
        // console.log(authToken);
        // res.json(user);
        res.json({
            authToken
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
}
//2. Controller to Login an existing User
//Login a user using: POST '/api/auth/login'. Doesn't require auth, no login required
module.exports.loginUser = async function (req, res) {
    try {
        //check whether the user already exists for a given email
        //we search the user collection by email and check if a user is defined for req.body.email
        let user = await User.findOne({ email: req.body.email })
        //  console.log(user);

        if (!user) {
            //if user with given email does not exist
            //then throw error and return
           return res.status(400).json({ error:"Please try to login with correct credentials" });
        }

        //if user with the email address exists,
        //we compare the stored password and the user entered password
        const passwordCompare = await bcrypt.compare(req.body.password, user.password);

        if(!passwordCompare){
            //if the passwords dont match
            return res.status(400).json({ error:"Please try to login with correct credentials" });
        }

        //if passwords match
        const payload =
        {
         user:{
            id: user.id
         }
        }
        const authToken = jwt.sign(payload, JWT_TOKEN);
        // console.log(authToken);
        // res.json(user);
        res.json({
            authToken
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
}
//3. Controller to get Details of an existing User.
//Get details of  a user using: POST '/api/auth/getuser'.
//requires auth, login required

module.exports.getUserDetails = async function (req, res) {
    try {
        const userId = req.user.id;
        //we find the ser in the database by the id and get the details of user in the user variable except the password
        let user = await User.findById(userId).select("-password");
        // here we get all the details of the user except password
        //  console.log(user);
        res.send(user);
        //send the user details except password as a response
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
    }
}