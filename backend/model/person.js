const mongoose = require("../utils/db");

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  usernumber: { type: String, index: { unique: true } },
  password: String,
  name: {
    type: String,
  },
  gender: String,
  class: String,
  grade: String,
  major: String,
  authority: String,
  pic: {
    type: String,
    default: "/img/pic.png",
  },
  email: {
    type: String,
    match: /^([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+.([a-zA-Z]{2,4})$/,
    default: "",
  },
  status: {
    type: Number,
    default: 1,
  },
  summary: {
    type: String,
    default: "",
  },
  livingroom: {
    type: String,
    default: ""
  }
});

const PersonModel = mongoose.model("users", PersonSchema);

/**
 * 查询 一个用户 是否存在
 * @param {object} requirement 查询条件
 */
const userIsExist = (requirement) => {
  return new Promise((resolve, reject) => {
    PersonModel.findOne(requirement, "usernumber", (err, doc) => {
      if (doc && doc.usernumber) {
        return resolve(true);
      }

      resolve(false);
    });
  });
};

/**
 * 新建一个用户，并返回承载用户信息的对象
 * @param {Object} userInfoObj 用户信息对象
 * @returns {Object} 用户信息
 */
const newUser = async (userInfoObj) => {

  let newer = new PersonModel({
    ...userInfoObj,
  });
  let res = await newer.save();

  if (!res) {
    return false;
  }
  return newer.toObject();
};

/**
 * 获取一个用户的信息（经过筛选后的）
 * @param {*} usernumber
 */
const getUserInfo = async (usernumber) => {
  const res = await PersonModel.findOne({ usernumber }, "-password");

  return res;
};

module.exports = {
  PersonModel,
  userIsExist,
  newUser,
  getUserInfo,
};
