const mongoose = require("../utils/db");

const Schema = mongoose.Schema;

const ClassSchema = new Schema({
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
  major: String,
  summary: {
    type: String,
    default: "",
  },
  students: {
    type: Array,
    default: []
  }
});

const ClassModel = mongoose.model("class", ClassSchema);

module.exports = {
  ClassModel,
};
