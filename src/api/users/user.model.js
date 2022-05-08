const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const {
  validationPassword,
  validationEmail,
} = require("../../utils/validators/validators");

const userSchema = new mongoose.Schema(
  {
    email: { type: String, trim: true, required: true },
    name: { type: String, trim: true, required: true },
    role: { type: String, trim: true, required: true },
    password: { type: String, trim: true, required: true },
    guardianName: { type: String, trim: true },
    guardianEmail: { type: String, trim: true },
    group: { type: String, trim: true, required: true },
    active: { type: Boolean, required: false },
    completedActivities: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "activities",
        require: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  if (!validationPassword(this.password)) {
    return next(setError(403, "formato de contraseña incorrecto"));
  }
  if (!validationEmail(this.email)) {
    return next(new Error());
  }

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

const User = mongoose.model("users", userSchema);
module.exports = User;
