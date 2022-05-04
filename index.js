const express = require("express");
const cors = require("cors");
const ActivityRoutes = require("./src/api/activities/activity.routes");
const UserRoutes = require("./src/api/users/user.routes");
const { connect } = require("./src/utils/database/db");
const { setError } = require("./src/utils/error/error");

const PORT = process.env.PORT || 3000;

/* EXPRESS */
const app = express();

/* THE CONNECTION */
connect();

/* THE APP FEATURES */

app.use(cors());
app.use(express.json());

/* THE ROUTES */

app.use("/api/activities", ActivityRoutes);
app.use("/api/users", UserRoutes);

app.get("/", (req, res) => {
  res.send("Bienvenido al server Cálculo Mental");
});
app.get("/api", (req, res) => {
  res.send("Bienvenido al server Cálculo Mental");
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, PATCH");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.disable("x-powered-by");

/* THE ERROR MANAGEMENT */

app.use((req, res, next, error) => {
  setImmediate(() => {
    next(setError(error.statusCode, "Something went wrong"));
  });
});

app.use("*", (req, res, next) => {
  const error = new Error();
  error.status = 404;
  error.message = "Route not found";
  return next(error);
});

app.use((error, req, res, next) => {
  return res.status(error.status || 500).json(error.message || "Unexpected error");
});

app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

const server = app.listen(PORT, () => {
  console.log(`Server listening on port 🙈: ${PORT}`);
});
