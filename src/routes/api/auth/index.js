const express = require('express');
const router = express.Router();

router.use(require('./login'));
router.use(require('./logout'));

module.exports = router;