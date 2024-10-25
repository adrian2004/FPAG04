import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/login/Login';
import HomePage from './pages/home/Home';
import Logout from './pages/logout/Logout'
import LoginPage2 from './pages/login/login2';

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/logout" element={<Logout/>} />
            <Route path="/login2" element={<LoginPage2 />} />
        </Routes>
    );
};

export default App;
