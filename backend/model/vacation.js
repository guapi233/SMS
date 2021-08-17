const mongoose = require("../utils/db");

const Schema = mongoose.Schema;

const VacationSchema = new Schema({
  id: String,
  usernumber: String,
  reason: String,
  status: {
    type: Number,
    default: 1,
  },
  summary: {
    type: String,
    default: "",
  },
  result: String,
  passed: Boolean,
  beginTime: String,
  endTime: String,
  passPerson: String,
});

const VacationModel = mongoose.model("result", VacationSchema);

module.exports = {
    VacationModel,
};
