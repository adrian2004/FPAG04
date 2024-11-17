const express = require('express');
const router = express.Router();
const authenticateToken = require('../../../middleware/authenticateToken');

router.get('/validate', authenticateToken, (req, res) => {
    res.status(200).send();
});

router.post('/validate', authenticateToken, (req, res) => {
    res.status(200).send();
});

module.exports = router;