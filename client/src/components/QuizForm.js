import React, { useState } from 'react';
import axios from 'axios';

const QuizForm = () => {
    const [title, setTitle] = useState('');
    const [videoUrl, setVideoUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token'); // 使用 JWT
        try {
            await axios.post('http://localhost:5000/api/quizzes', { title, videoUrl }, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Quiz created successfully!');
        } catch (error) {
            console.error("Error creating quiz", error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a New Quiz</h2>
            <input placeholder="Quiz Title" onChange={(e) => setTitle(e.target.value)} required />
            <input placeholder="Video URL" onChange={(e) => setVideoUrl(e.target.value)} />
            <button type="submit">Create Quiz</button>
        </form>
    );
};

export default QuizForm;