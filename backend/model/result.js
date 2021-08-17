const mongoose = require("../utils/db");

const Schema = mongoose.Schema;

const ResultSchema = new Schema({
  usernumber: String,
  name: {
    type: String,
  },
  status: {
    type: Number,
    default: 1,
  },
  summary: {
    type: String,
    default: "",
  },
  result: String,
  qualified: Boolean
});

const ResultModel = mongoose.model("result", ResultSchema);

module.exports = {
  ResultModel,
};
