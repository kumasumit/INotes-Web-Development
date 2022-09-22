//Create a user using: POST '/api/auth'. Doesn't require auth, no login required
//1. Controller to Create a new User
module.exports.creatUser = async function (req, res) {

    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    //if the errors is not empty, it means we need to send those errors
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        //check whether the user already exists for a given email
        //we search the user collection by email and check if already user is defined for req.body.email
        let user = await User.findOne({ email: req.body.email })
        //  console.log(user);

        if (user) {
            //if user with given email already exists
            res.status(400).json({ error: "Sorry a user with this email already exists" });
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
        })
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error Occured");
    }
}
