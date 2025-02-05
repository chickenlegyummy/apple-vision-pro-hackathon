const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quizzes');
const questionRoutes = require('./routes/questions');
const path = require('path');

const app = express();
const dbPath = path.join(__dirname, 'school-quiz.db'); // 指定數據庫文件名
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database ' + err.message);
    } else {
        console.log('Connected to the SQLite database.');
        // 創建表格
        db.serialize(() => {
            db.run(`CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE,
                password TEXT,
                role TEXT DEFAULT 'student'
            )`);
            
            db.run(`CREATE TABLE IF NOT EXISTS quizzes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                title TEXT,
                video_url TEXT,
                teacher_id INTEGER,
                FOREIGN KEY(teacher_id) REFERENCES users(id)
            )`);
            
            db.run(`CREATE TABLE IF NOT EXISTS questions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                quiz_id INTEGER,
                question_text TEXT,
                question_type TEXT,
                options TEXT,
                FOREIGN KEY(quiz_id) REFERENCES quizzes(id)
            )`);
        });
    }
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes(db));
app.use('/api/quizzes', quizRoutes(db));
app.use('/api/questions', questionRoutes(db));

app.listen(5000, () => {
    console.log('Server is running on http://localhost:5000');
});