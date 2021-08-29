const mongoose = require("../utils/db");

const Schema = mongoose.Schema;

const CheckingSchema = new Schema({
  id: String,
  usernumber: String,
  checkId: String,
  time: Date,
});

const CheckingModel = mongoose.model("checking", CheckingSchema);

module.exports = {
  CheckingModel,
};
