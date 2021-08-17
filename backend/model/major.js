const mongoose = require("../utils/db");

const Schema = mongoose.Schema;

const MajorSchema = new Schema({
  id: String,
  name: {
    type: String,
  },
  pic: {
    type: String,
    default: "/img/pic.png",
  },
  teacher: String,
  status: {
    type: Number,
    default: 1,
  },
  summary: {
    type: String,
    default: "",
  },
});

const MajorModel = mongoose.model("major", MajorSchema);

module.exports = {
  MajorModel,
};
