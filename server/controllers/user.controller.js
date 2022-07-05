const User = require('../models/user.model');

// create user
exports.create = async (req, res) => {
    const { firstName, lastName, email, dateOfBirth, mobile, status, password, accountType } = req.body;

    try {
        // increment user id
        let maxID_user = await User.find({}).sort({id: -1}).limit(1);
        let maxID = maxID_user[0].id;
        let id = maxID + 1;

        const user = await User.create({ id, firstName, lastName, email, dateOfBirth, mobile, status, password, accountType });
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// get all users
exports.getAll = async (req, res) => {
    try {
        const users = await User.find({}).sort({ createdAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

};

// get single user by id
exports.getByID = async (req, res) => {
    const { id } = req.params;

    const user = await User.findOne({ 'id': id });

    if (!user) {
        return res.status(400).json({ error: 'user not found' });
    }

    res.status(200).json(user);
};

// update user
exports.update = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findOneAndUpdate({ 'id': id }, { ...req.body }, { runValidators: true });

        if (!user) {
            return res.status(400).json({ error: 'user not found' });
        }

        res.status(200).json({ 'msg': `user ${id} updated` });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// delete user
exports.delete = async (req, res) => {
    const { id } = req.params;

    const user = await User.findOneAndDelete({ 'id': id });

    if (!user) {
        return res.status(400).json({ error: 'user not found' });
    }

    res.status(200).json({ 'msg': `user ${id} deleted` });
};