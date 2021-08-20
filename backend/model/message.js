const mongoose = require("../utils/db");

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
  id: String,
  usernumber: String,
  type: String,
  time: String,
  by: String,
  content: String,
  status: {
    type: Number,
    default: 1,
  },
});

const MessageModel = mongoose.model("message", MessageSchema);

const newMes = (obj) => {
  const newer = new MessageModel(obj);
  newer.save();

  return true;
};

const readMes = (id) => {
  MessageModel.updateOne({ id }, { $set: { status: 0 } }, (err, data) => {});
};

module.exports = {
  MessageModel,
  readMes,
  newMes,
};
