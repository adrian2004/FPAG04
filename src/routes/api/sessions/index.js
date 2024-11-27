const express = require('express');
const router = express.Router();

router.use(require('./active'));

module.exports = router;