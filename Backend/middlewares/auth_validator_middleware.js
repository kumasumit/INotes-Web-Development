const { check } = require('express-validator');
const { validationResult } = require('express-validator');


//Validator 1 :: /createuser, validate creating a user
//a validator to validate create User/ inputs while creating a user
module.exports.createUserValidator = async function(req, res, next) {
    await check('name').isLength({ min:3 }).withMessage('Name of user has to be minimum 3 characters long').run(req);
    await check('email').isEmail().
    withMessage('Please enter a valid email').run(req);
    await check('password').isLength({ min: 5 })
    .withMessage('must be at least 5 chars long')
    .not()
    .isIn(['123', 'password', 'god'])
    .withMessage('Do not use a common word as the password')
    .matches(/\d/)
    .withMessage('must contain a number').run(req);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const result = validationResult(req);
    if (!result.isEmpty()) {
        //if there are errors return the bad request and error response
        return res.status(400).json({ errors: result.array() });
    }
    //if the error array is empty, ,means there are no errors, then
    //pass the user enter data to next() function, which is controllers in this case
    next();
}

//Validator 2 :: /login, validate logging/authenticating a user
//a validator to validate login User/ inputs while logging a user
module.exports.loginUserValidator = async function(req, res, next) {

    await check('email').isEmail().
    withMessage('Please enter a valid email').run(req);
    await check('password').notEmpty().
    //notempty checks that the password field is not empty
    withMessage('Password cannot be blank').run(req);
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const result = validationResult(req);
    if (!result.isEmpty()) {
        //if there are errors return the bad request and error response
        return res.status(400).json({ errors: result.array() });
    }
    //if the error array is empty, ,means there are no errors, then
    //pass the user enter data to next() function, which is controllers in this case
    next();
}

