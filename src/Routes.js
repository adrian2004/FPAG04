import React from 'react';

import { Routes, Route } from 'react-router-dom';
import LoginPage from './views/login/Login';
import HomePage from './views/home/Home';
import Logout from './views/logout/Logout'
// import LoginPage2 from './views/login/Login2';

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/logout" element={<Logout/>} />
            {/* <Route path="/login2" element={<LoginPage2 />} /> */}
        </Routes>
    );
};

export default App;
