const User = require("../api/users/user.model");
const JwtUtils = require("../utils/jwt/jwt");

const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return next(new Error());
    }

    const parsedToken = token.replace("Bearer ", "");
    const validToken = JwtUtils.verifyToken(
      parsedToken,
      process.env.JWT_SECRET
    );
    const userLogued = await User.findById(validToken.id);
    req.user = userLogued;
    next();
  } catch (error) {
    return next(error);
  }
};

module.exports = { isAuth };
