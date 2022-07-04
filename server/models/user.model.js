const mongoose = require('mongoose');
const validator = require('validator');

const userRoles = ['admin', 'user'];

const schema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
        maxLength: 128 
    },
    lastName: {
        type: String,
        required: true,
        maxLength: 128
    },
    email: {
        type: String,
        required: true,
        maxLength: 255,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'invalid email']
    },
    dateOfBirth: {
        type: Date,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    },
    status: {
        type: Boolean,
        default: false,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength : 6,
        maxLength : 254

    },
    accountType: {
        type: String,
        enum: userRoles,
        default: 'user',
        required: true
    }
}, {timestamps : true});

module.exports = mongoose.model('User', schema);