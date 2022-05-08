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
    if (userExist) {
      console.log('ERROR: (user.controller(register)) - user already exist');
      return res.status(400).json({"message": "user already exists"});
    }
    const userDB = await user.save();
    return res.status(201).json(userDB);
  } catch (error) {
    return next(setError(error.statusCode, "Register unsuccessful"));
  }
};

const login = async (req, res, next) => {
  try {
    console.log('INFO-API: (user-loginController) req.body: ', req.params);
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
    console.log('INFO-API: (user-addActivity):', req.body);
    const user = await User.findByIdAndUpdate(req.params._id, req.body);
    console.log('user',  user);
    const userToSend = await User.findById(req.params._id);
    res.status(200).json(userToSend);
  } catch (error) {
    return next(setError(error.statusCode, "Item not modified"));
  }
};

const activateUser = async (req, res, next) => {
  try {
    console.log('INFO-API: (user-activateUser):', req.params.email);
    let user = await User.findOne({ email: req.params.email });
    console.log(user)
    user.active = true;
    const confirmedUser = await User.findOneAndUpdate({ email: req.params.email }, user);
    const userToSend = await User.findOne({ email: req.params.email });
    res.status(200).json(userToSend);
  } catch(error) {
    return next(setError(error.statusCode, "User not verified"));
  }
}

module.exports = {
  getOne,
  getAll,
  register,
  login,
  logout,
  addActivity,
  activateUser
};
