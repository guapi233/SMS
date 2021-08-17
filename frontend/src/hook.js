import axios from "axios";

export const login = (usernumber, password) => {
  return axios.post("http://localhost:3000/person/login", {
    usernumber,
    password,
  });
};

// 获取人员列表
export const getPersonList = async (obj, wheres) => {
  let url = "http://localhost:3000/person/getlist?";
  for (let key in wheres) {
    url += `${key}=${wheres[key]}&&`
  }
  const res = await axios.get(url);

  obj.value = res.data.data;
};

// 获取课程列表
export const getMyCourse = async (obj, wheres = {}) => {
  let url = "http://localhost:3000/course/getlist?";
  for (let key in wheres) {
    url += `${key}=${wheres[key]}&&`
  }
  const res = await axios.get(url);

  obj.value = res.data.data;
}

// 获取课程信息
export const getCourseInfo = async (obj, name, callback) => {
  let url = `http://localhost:3000/course/getinfo?name=${name}`;

  const res = await axios.get(url);

  obj.value = res.data.data[0];

  callback();
}

// 获取指定课程的考试列表
export const getExamList = async (obj, wheres = {}) => {
  let url = "http://localhost:3000/course/getexamlist?";
  for (let key in wheres) {
    url += `${key}=${wheres[key]}&&`
  }
  const res = await axios.get(url);

  obj.value = res.data.data;
}

// 获取我的考试列表
export const getMyExam = async (obj, wheres = {}) => {
  let url = "http://localhost:3000/course/getmyexam?";
  for (let key in wheres) {
    url += `${key}=${wheres[key]}&&`
  }
  const res = await axios.get(url);

  obj.value = res.data.data;
}

// 获取指定课程的成绩列表
export const getResultList = async (obj, wheres = {}, callback) => {
  let url = "http://localhost:3000/result/getlist?";
  for (let key in wheres) {
    url += `${key}=${wheres[key]}&&`
  }
  const res = await axios.get(url);

  obj.value = res.data.data;

  callback && callback();
}

// 获取我的成绩列表
export const getMyResultList = async (obj, wheres = {}) => {
  let url = "http://localhost:3000/result/getmy?";
  for (let key in wheres) {
    url += `${key}=${wheres[key]}&&`
  }
  const res = await axios.get(url);

  obj.value = res.data.data;
}

// 添加人员
export const addPerson = async (obj) => {
  return axios.post("http://localhost:3000/person/new", obj);
}

// 添加课程
export const addCourse = async (obj) => {
  return axios.post("http://localhost:3000/course/new", obj);
}

// 添加考试
export const addExam = async (obj) => {
  return axios.post("http://localhost:3000/course/newexam", obj);
}

// 添加成绩
export const addResult = async (obj) => {
  return axios.post("http://localhost:3000/result/new", obj);
}