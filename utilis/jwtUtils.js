const jwt = require("jsonwebtoken");

const env = require("../config/index");

exports.createToken = (payload) =>
  jwt.sign({ userId: payload }, env.JWT_SECRET_KEY, {
    expiresIn: env.JWT_EXPIRE_TIME,
  });

  