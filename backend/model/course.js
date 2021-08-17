const mongoose = require("../utils/db");

const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  id: String,
  name: {
    type: String,
  },
  pic: {
    type: String,
    default: "/img/pic.png",
  },
  teacher: String,
  region: String,
  type: String,
  students: {
    type: String,
    default: ""
  },
  status: {
    type: String,
    default: 1,
  },
  summary: {
    type: String,
    default: "",
  },
  beginTime: Date,
  endTime: Date,
  day: Array
});

const CourseModel = mongoose.model("course", CourseSchema);

module.exports = {
  CourseModel,
};
