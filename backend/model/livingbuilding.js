const mongoose = require("../utils/db");

const Schema = mongoose.Schema;

const LivingBuildingSchema = new Schema({
  name: String,
  status: {
    type: Number,
    default: 1,
  },
  summary: {
    type: String,
    default: "",
  }
});

const LivingBuildingModel = mongoose.model("livingbuilding", LivingBuildingSchema);

module.exports = {
  LivingBuildingModel,
};
