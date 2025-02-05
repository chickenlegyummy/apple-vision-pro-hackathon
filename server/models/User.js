const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['teacher', 'student'], default: 'student' }
});

module.exports = mongoose.model('User', UserSchema);