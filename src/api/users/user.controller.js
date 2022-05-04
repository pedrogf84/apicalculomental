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

const register = async (req, res, next) => {
  try {
    console.log("dentro de register", req.body);
    const user = new User(req.body);

    const userExist = await User.findOne({ email: user.email });
    if (userExist) {
      return next(setError(error.statusCode, "User already exists"));
    }
    const userDB = await user.save();
    return res.status(201).json(userDB.name);
  } catch (error) {
    return next(setError(error.statusCode, "Register unsuccessful"));
  }
};

const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(setError(404, "This user is not registered"));
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = JwtUtils.generateToken(user._id, user.email);

      return res.status(200).json({token, user});
    }
  } catch (error) {
    return next(setError(error.statusCode, "Logging unsuccessful"));
  }
};

const logout = (req, res, next) => {
  try {
    const token = null;
    return res.status(201).json("logout successful");
  } catch (error) {
    return next(
      setError(error.statusCode, "An error occured while logging out ")
    );
  }
};

const addActivity = async (req, res, next) => {
  try {
    const updateUser = await User.findOneAndUpdate(req.params._id, req.body);
    res.status(200).json(updateUser);
  } catch (error) {
    return next(setError(error.statusCode, "Item not modified"));
  }
};

module.exports = {
  getOne,
  register,
  login,
  logout,
  addActivity,
};
