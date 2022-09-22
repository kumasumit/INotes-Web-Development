const mongoose= require('mongoose');
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
        // we have made unique true so that every user has a unique email , so that it can be used as a username
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model('User', userSchema);
module.exports = User;