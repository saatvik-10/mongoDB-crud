const express = require("express");
const router = express.Router();
const logoutCon = require("../controllers/logoutCon");

router.get("/", logoutCon.handleLogout);

module.exports = router;
