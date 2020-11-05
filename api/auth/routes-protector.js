const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const decoded = jwt.verify(req.body.token, process.env.JWT_KEY, null);
    req.userInfo = decoded;
    next();
  } catch (error) {
    res.status(401).send("to continue you shold be logged in");
  }
};
