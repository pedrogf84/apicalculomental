const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    id: { type: String, required: true, trim: true },
    level: { type: String, required: true, trim: true },
    type: { type: String, required: false, trim: true },
    questions: [{ type: String, required: false, trim: true }],
  },

  {
    timestamps: true,
  }
);

const Activity = mongoose.model("activities", activitySchema);

module.exports = Activity;
