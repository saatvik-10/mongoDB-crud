const allowedOrigins = require("../config/allowedOrigins");

const credentials = (req, res, next) => {
  const origin = req.headers.origini;
  if (allowedOrigins.includes(origin)) {
    res.header("Allowed-Control-Allow-Credentials"), true;
  }
  next();
};

module.exports = credentials;
