const mongoose = require("../utils/db");

const Schema = mongoose.Schema;

const ExamSchema = new Schema({
  name: String,
  course: String,
  region: String,
  status: {
    type: Number,
    default: 1,
  },
  summary: {
    type: String,
    default: "",
  },
  students: {
    type: String,
    default: ""
  },
  beginTime: String,
});

const ExamModel = mongoose.model("exam", ExamSchema);

module.exports = {
  ExamModel,
};
