const UserRoutes = require("express").Router();
const { register, login, logout, addActivity, getOne, getAll } = require("./user.controller");
const { isAuth } = require("../../middlewares/auth.middleware");

UserRoutes.get("/:_id", getOne);
UserRoutes.get("/", getAll);
UserRoutes.post("/register", register);
UserRoutes.post("/login", login);
UserRoutes.post("/logout", [isAuth], logout);
UserRoutes.patch("/add-activity/:_id", [isAuth], addActivity);

module.exports = UserRoutes;
