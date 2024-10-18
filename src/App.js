import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/Login';
import HomePage from './pages/home/Home';
import Logout from './pages/logout/Logout'

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/logout" element={<Logout/>} />
        </Routes>
    );
};

export default App;
