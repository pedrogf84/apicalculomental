const User = require("./user.model");
const bcrypt = require("bcrypt");
const JwtUtils = require("../../utils/jwt/jwt");
const { setError } = require("../../utils/error/error");

const getOne = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const user = await User.findById(_id).populate("completedActivities");
    res.status(200).json(user);
  } catch (error) {
    return next(setError(error.statusCode, "An error occured getting user"));
  }
};

const getAll = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    return next(setError(error.statusCode, "An error occured getting all users"));
  }
};

const register = async (req, res, next) => {
  try {
    console.log("INFO: (user - registerController) req.body: ", req.body);
    const user = new User(req.body);

    const userExist = await User.findOne({ email: user.email });
    if (!userExist) {
      console.log('user doesnt exist');
      res.statusMessage = "user doesnot match";
      res.status(400).end();
    }
    const userDB = await user.save();
    return res.status(201).json(userDB.name);
  } catch (error) {
    return next(setError(error.statusCode, "Register unsuccessful"));
  }
};

const login = async (req, res, next) => {
  try {
    console.log('INFO-API: (user-loginController) req.body: ', req.body);
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(setError(404, "error"));
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = JwtUtils.generateToken(user._id, user.email);

      return res.status(200).json({ token, user });
    }
  } catch (error) {
    return next(setError(error.status, "Logging unsuccessful"));
  }
};

const logout = (req, res, next) => {
  try {
    console.log('INFO-API: (user-logoutController)');
    const token = null;
    return res.status(201).json("logout successful");
  } catch (error) {
    return next(setError(error.statusCode, "An error occured while logging out "));
  }
};

const addActivity = async (req, res, next) => {
  try {
    console.log('INFO-API: (user-addActivity)');
    const user = await User.findByIdAndUpdate(req.params._id, req.body);
    res.status(200).json(user);
  } catch (error) {
    return next(setError(error.statusCode, "Item not modified"));
  }
};

module.exports = {
  getOne,
  getAll,
  register,
  login,
  logout,
  addActivity,
};
