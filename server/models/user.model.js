const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userRoles = ['admin', 'user'];

const schema = new mongoose.Schema({
    id: {
        type: Number,
        required: [true, 'ID is required'],
        unique: true,
    },
    firstName: {
        type: String,
        maxLength: [128, 'First Name maximum limit 128 characters']
    },
    lastName: {
        type: String,
        maxLength: [128, 'Last Name maximum limit 128 characters']
    },
    email: {
        type: String,
        required: true,
        maxLength: 255,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, 'Invalid Email']
    },
    dateOfBirth: {
        type: Date,
    },
    mobile: {
        type: Number,
    },
    status: {
        type: Boolean,
        default: false,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password should be higher than 6 characters'],
        maxLength: [254, 'Password too long']

    },
    accountType: {
        type: String,
        enum: userRoles,
        default: 'user',
        required: true
    }
}, { timestamps: true });

schema.pre('save', async function save(next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    } catch (err) {
        return next(err);
    }
});

schema.methods.validatePassword = async function validatePassword(data) {
    return bcrypt.compare(data, this.password);
};

schema.statics.login = async function (email, password) {
    const user = await this.findOne({ "email": email });

    if (!user) {
        throw Error('incorrect email');
    }

    // check password
    const auth = bcrypt.compare(user.password, password) ? true : false;

    if (!auth) {
        throw Error('incorrect password');
    }

    return user;
}

module.exports = mongoose.model('User', schema);