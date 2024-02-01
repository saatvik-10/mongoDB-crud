const express = require("express");
const router = express.Router();
const authCon = require("../controllers/authCon");

router.post("/", authCon.handleLogin);

module.exports = router;
