const express = require('express');

module.exports = (db) => {
    const router = express.Router();

    router.post('/', (req, res) => {
        const { quiz_id, question_text, question_type, options } = req.body;
        db.run('INSERT INTO questions (quiz_id, question_text, question_type, options) VALUES (?, ?, ?, ?)', [quiz_id, question_text, question_type, JSON.stringify(options)], function(err) {
            if (err) return res.status(400).send(err.message);
            res.status(201).json({ id: this.lastID, quiz_id, question_text, question_type, options });
        });
    });

    return router;
};