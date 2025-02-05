import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import QuizForm from './components/QuizForm';
import Results from './components/Results';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/quizzes/new" element={<QuizForm />} />
                <Route path="/results" element={<Results />} />
                <Route path="/" element={<Login />} /> {/* 默認路由 */}
            </Routes>
        </Router>
    );
};

export default App;