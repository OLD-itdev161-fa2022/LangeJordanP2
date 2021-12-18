const mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * So this is the data to be pushed/pulled to the MongoDB
 * it has only 1 variable. And it has multiple requirements
 */
const userSchema = new Schema ({
    username: {
        type: String, //what type is the requirement
        required: true,
        unique: true,
        trim: true, //trims white space off if a user puts a space
        minlength: 3 // must be at least 3 characters long 
    },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;