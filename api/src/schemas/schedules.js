const mongoose = require("mongoose");

const scheduleSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  date: { type: Date, required: true },
  deleted: { type: Boolean, default: false },
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

module.exports = Schedule;
