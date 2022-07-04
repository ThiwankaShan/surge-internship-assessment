const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

exports.authorize = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        console.log("unauthorized");
        return res.status(403).json({ error: "unauthorized" });
    }

    jwt.verify(token, process.env.JWT_SECRET, (error, decodedToken) => {
        if (error) {
            console.log(error.message);
            return res.status(403).json({ error: "unauthorized" });
        } else {
            next();
        }
    });
}

exports.checkUser = (req, res, next) => {
    const token = req.cookies.jwt;

    if (!token) {
        res.cookie('user', null);
        next();
    }

    jwt.verify(token, process.env.JWT_SECRET, async (error, decodedToken) => {
        if (error) {
            res.cookie('user', null);
            next();
        } else {
            let user = await User.findOne({ id: decodedToken.id });
            res.cookie('user', {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                status: user.status
            });
            next();
        }
    });
}