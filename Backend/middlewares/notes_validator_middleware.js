const { check } = require('express-validator');
const { validationResult } = require('express-validator');


//Validator 1 :: /addnote, validate creating a note
//a validator to validate create a Note/ inputs while creating a note
module.exports.createNoteValidator = async function(req, res, next) {
    await check('title').isLength({ min:3 }).withMessage('Title has to be minimum 3 characters long').run(req);
    await check('description').isLength({ min:5 }).withMessage('Description has to be minimum 5 characters long').run(req);
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