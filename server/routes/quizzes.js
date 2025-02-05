const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    router.post('/', (req, res) => {
        const { title, video_url, teacher_id } = req.body;
        db.run('INSERT INTO quizzes (title, video_url, teacher_id) VALUES (?, ?, ?)', [title, video_url, teacher_id], function(err) {
            if (err) return res.status(400).send(err.message);
            res.status(201).json({ id: this.lastID, title, video_url, teacher_id });
        });
    });

    return router;
};