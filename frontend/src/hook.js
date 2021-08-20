import axios from "axios";
import { useStore } from "vuex";

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

  callback && callback();
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

// 获取我的班级信息
export const getMyClass = async (obj, wheres = {}, callback) => {
  let url = "http://localhost:3000/class/getinfo?";
  for (let key in wheres) {
    url += `${key}=${wheres[key]}&&`
  }
  const res = await axios.get(url);

  obj.value = res.data.data;

  callback && callback();
}

// 获取请假记录
export const getVacationList = async (obj, wheres = {}, callback) => {
  let url = "http://localhost:3000/vacation/getlist?";
  for (let key in wheres) {
    url += `${key}=${wheres[key]}&&`
  }
  const res = await axios.get(url);

  obj.value = res.data.data;

  callback && callback();
}

// 获取我的消息
export const getMessageList = async (obj, wheres = {}) => {
  let url = "http://localhost:3000/message/getlist?";
  for (let key in wheres) {
    url += `${key}=${wheres[key]}&&`
  }
  const res = await axios.get(url);

  obj.value = res.data.data;
}

// 获取寝室区域列表
export const getLvbuildingList = async (obj, wheres = {}) => {
  let url = "http://localhost:3000/lvbuilding/getlist?";
  for (let key in wheres) {
    url += `${key}=${wheres[key]}&&`
  }
  const res = await axios.get(url);

  obj.value = res.data.data;
}


// 阅读消息
export const readMes = async (obj) => {
  return axios.post("http://localhost:3000/message/read", obj);
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

// 添加班级
export const addClass = async (obj) => {
  return axios.post("http://localhost:3000/class/new", obj);
}

// 请假
export const addVacation = async (obj) => {
  return axios.post("http://localhost:3000/vacation/new", obj);
}

// 批假
export const setVacation = async (obj) => {
  return axios.post("http://localhost:3000/vacation/set", obj);
}

// 修改密码
export const setPassword = async (obj) => {
  return axios.post("http://localhost:3000/person/setpassword", obj);
}

// 添加寝室区域
export const addLvBuilding = async (obj) => {
  return axios.post("http://localhost:3000/lvbuilding/new", obj);
}

// 添加寝室
export const addLvRoom= async (obj) => {
  return axios.post("http://localhost:3000/lvroom/new", obj);
}


// 判断是否运行于移动端
export const isRunnigMobile = () => {
  const store = useStore();
  if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    store.commit("runningMobile");
  }
}