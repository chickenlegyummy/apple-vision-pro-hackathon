const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = (db) => {
    const router = express.Router();

    router.post('/login', (req, res) => {
        const { username, password } = req.body;
        db.get('SELECT * FROM users WHERE username = ?', [username], (err, user) => {
            if (err || !user || user.password !== password) {
                return res.status(401).send('Invalid credentials');
            }
            // 如果需要，可以添加 JWT 生成邏輯
            res.json({ message: 'Login successful' });
        });
    });

    return router;
};