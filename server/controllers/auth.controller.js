const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

// login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.login(email, password);
        const token = generateToken(user);
        res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.JWT_EXPIRATION_MINUTES * 60 * 1000 });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// logout user
exports.logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).json({ msg: "Succesfully logged out" });
};

generateToken = (user) => {
    return jwt.sign({
        "id": user.id,
        "status": user.status,
        "email": user.email,
        "role": user.role
    }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRATION_MINUTES * 60
    });
}