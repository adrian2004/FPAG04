const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authenticateToken');

router.get('/home', authenticateToken, (req, res) => {
    res.status(200).send();
});

module.exports = router;