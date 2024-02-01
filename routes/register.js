const express = require('express');
const router = express.Router();
const registerCon = require('../controllers/registerCon');

router.post('/', registerCon.handleNewUser);

module.exports = router;