//here we handle all the imports/requires
const User = require('../models/users');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
//here all the imports/requires end


const JWT_TOKEN = "sumitisagoo$dby";
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
        res.status(500).send("Some Error Occured");
    }
}
