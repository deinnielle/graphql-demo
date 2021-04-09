const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: [true, "Name is required!"] },
  description: { type: String, required: [true, "Description is required!"] },
  additionalInfo: { type: String },
  // services: [{ type: Schema.Types.ObjectId }],
  serviceID: { type: Schema.Types.ObjectId },
});

module.exports = mongoose.model("Project", projectSchema);
