const mongoose = require("../utils/db");

const Schema = mongoose.Schema;

const LivingRoomSchema = new Schema({
  name: String,
  status: {
    type: Number,
    default: 1,
  },
  summary: {
    type: String,
    default: "",
  },
  building: String,
  max: Number
});

const LivingRoomModel = mongoose.model("livingroom", LivingRoomSchema);

module.exports = {
  LivingRoomModel,
};
