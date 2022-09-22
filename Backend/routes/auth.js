//here we handle all the imports/requires
const express = require('express')
const router = express.Router();
//include the auth_controller
const authController = require('../controllers/auth_controller');
//include the auth_validator_middleware
const authValidatorMiddleware = require('../middlewares/auth_validator_middleware');
//inclde the fetch_user_middleware
const fetchUser = require("../middlewares/fetch_user_middleware");
//here all the imports/requires end

//Route 1: Route to create a new user
//Create a user using: POST '/api/auth/createuser'.
//Doesn't require auth, no login required
router.post('/createuser',authValidatorMiddleware.createUserValidator, authController.createUser);
//createUser is an action in auth_controller.js inside controllers folder


//Route 2: Login a User
//Login/Authenticate a user using: POST '/api/auth/login'.
//Doesn't require auth, no login required
router.post('/login',authValidatorMiddleware.loginUserValidator, authController.loginUser);


//Route 2: GetDetails of a User
//getDetails of a user using: POST '/api/auth/getuser'.
//requires auth, login required
router.post('/getuser',fetchUser, authController.getUserDetails);

module.exports = router;
//at last we expport the router