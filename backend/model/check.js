const mongoose = require("../utils/db");

const Schema = mongoose.Schema;

const CheckSchema = new Schema({
  id: String,
  beginTime: Date,
  endTime: Date,
  isEnd: {
    type: Boolean,
    default: false
  },
  course: String,
  code: String
});

const CheckModel = mongoose.model("check", CheckSchema);

module.exports = {
  CheckModel,
};
