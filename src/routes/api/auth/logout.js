const express = require('express');
const router = express.Router();

const DEV_MODE = process.env.DEV_MODE;

router.post('/logout', async (req, res) => {
    res.clearCookie('token');
    if (!DEV_MODE) return res.status(302).redirect('/login');
    return res.status(302).redirect('http://localhost:5000/login');
});

router.get('/logout', async (req, res) => {
    res.clearCookie('token');
    if (!DEV_MODE) return res.status(302).redirect('/login');
    return res.status(302).redirect('http://localhost:5000/login');
});

module.exports = router;