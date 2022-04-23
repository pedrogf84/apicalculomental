const ActivityRoutes = require("express").Router();
const { isAuth } = require("../../middlewares/auth.middleware");

const {
  getAll,
  getOne,
  postOne,
  deleteOne,
  getAllByType,
} = require("./activity.controller");

ActivityRoutes.get("/", [isAuth], getAll);
ActivityRoutes.get("/:_id", [isAuth], getOne);
ActivityRoutes.get("/type/:type", [isAuth], getAllByType);
ActivityRoutes.post("/", [isAuth], postOne);
ActivityRoutes.delete("/:_id", [isAuth], deleteOne);

module.exports = ActivityRoutes;
