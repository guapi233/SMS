const mongoose = require("../utils/db");

const Schema = mongoose.Schema;

const VacationSchema = new Schema({
  id: String,
  type: String,
  usernumber: String,
  reason: String,
  status: {
    type: Number,
    default: 1,
  },
  passed: {
    type: String,
    default: "pendding",
  },
  beginTime: String,
  endTime: String,
  passPerson: String,
});

const VacationModel = mongoose.model("vacation", VacationSchema);

module.exports = {
    VacationModel,
};
