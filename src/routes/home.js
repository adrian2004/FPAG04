const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

router.get('/home', authenticateToken, (req, res) => {
    res.sendStatus(200);
});

module.exports = router;