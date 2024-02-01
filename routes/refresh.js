const express = require("express");
const router = express.Router();
const refreshTokenCon = require("../controllers/refreshTokenCon");

router.get("/", refreshTokenCon.handleRefreshToken);

module.exports = router;
