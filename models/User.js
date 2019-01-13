const mongoose = require('mongoose'),
    Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    Date: {
        type: Date,
        default: Date.now
    },
})

module.exports = mongoose.model('users', UserSchema)