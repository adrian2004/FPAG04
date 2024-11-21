const express = require('express');
const router = express.Router();
const authenticateToken = require('../../../middleware/authenticateToken');

router.get('/me', authenticateToken, (req, res) => {
    const response = {
        'id': req.user.id,
        'email': req.user.email
    }

    res.status(200).json(response);
});

module.exports = router;