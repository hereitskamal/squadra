const express = require('express');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

const router = express.Router();

const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Forbidden: Invalid token' });
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
};

router.get('/', authenticateJWT, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.status(200).json({ success: true, data: users });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred while fetching users', error: error.message });
    }
});

router.put('/:id', authenticateJWT, async (req, res) => {
    const { name, phone } = req.body;
    try {
        const userExists = await User.findById(req.params.id);
        if (!userExists) return res.status(404).json({ message: 'User not found' });

        const updatedUser = await User.findByIdAndUpdate(req.params.id, { name, phone }, { new: true });
        res.status(200).json({ success: true, data: updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user', error: error.message });
    }
});

router.delete('/:id', authenticateJWT, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        if (!deletedUser) return res.status(404).json({ message: 'User not found' });
        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete user', error: error.message });
    }
});

module.exports = router;
