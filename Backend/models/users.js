//require mongoose
const mongoose= require('mongoose');
//Design a User Schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        // the use of required is to tell that the field cannot be empty
    },
    email: {
        type: String,
        required: true,
        unique: true,
        // we have made unique true so that every user has a unique email/username , so that it can be used as a username
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
        //dont call the function here , no Date.now()
    }
});
//we connect User to userSchema
const User = mongoose.model('User', userSchema);
//we export the User model
module.exports = User;