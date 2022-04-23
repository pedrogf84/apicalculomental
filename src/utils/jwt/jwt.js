
const jwt = require("jsonwebtoken");


class JwtUtils {
  static generateToken(id, email) {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "1d" });
  }

  static verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  }
}

module.exports = JwtUtils;
