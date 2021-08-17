const mongoose = require("../utils/db");

const Schema = mongoose.Schema;

const SelectCourseSchema = new Schema({
  id: String,
  usernumber: String,
  courseId: String,
  status: {
    type: Number,
    default: 1,
  },
});

const SelectCourseModel = mongoose.model("selectCourse", SelectCourseSchema);

module.exports = {
  SelectCourseModel,
};
