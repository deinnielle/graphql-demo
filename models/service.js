const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dailyRate: { type: Number },
});

module.exports = mongoose.model("Service", serviceSchema);
