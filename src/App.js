import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/Login';
import HomePage from './pages/home/Home';

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
        </Routes>
    );
};

export default App;
