const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    video_url: { type: String },
    teacher_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Quiz', QuizSchema);