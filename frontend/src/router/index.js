import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/Login.vue"),
  },
  {
    path: "/person",
    name: "Person",
    component: () =>
      import(/* webpackChunkName: "Person" */ "../views/Opers/Person.vue"),
  },
  {
    path: "/createexam",
    name: "CreatEexam",
    component: () =>
      import(
        /* webpackChunkName: "CreateExam" */ "../views/Opers/CreateExam.vue"
      ),
  },
  {
    path: "/myres",
    name: "MyRes",
    component: () =>
      import(/* webpackChunkName: "MyRes" */ "../views/Opers/MyRes.vue"),
  },
  {
    path: "/createcourse",
    name: "CreateCourse",
    component: () =>
      import(
        /* webpackChunkName: "CreateCourse" */ "../views/Opers/CreateCourse.vue"
      ),
  },
  {
    path: "/mycourse",
    name: "MyCourse",
    component: () =>
      import(/* webpackChunkName: "MyCourse" */ "../views/Opers/MyCourse.vue"),
  },
  {
    path: "/courseinfo",
    name: "CourseInfo",
    component: () =>
      import(
        /* webpackChunkName: "CourseInfo" */ "../views/Opers/CourseInfo.vue"
      ),
  },
  {
    path: "/message",
    name: "Message",
    component: () =>
      import(/* webpackChunkName: "Message" */ "../views/Message.vue"),
  },
  {
    path: "/examinfo",
    name: "ExamInfo",
    component: () =>
      import(/* webpackChunkName: "ExamInfo" */ "../views/Opers/ExamInfo.vue"),
  },
  {
    path: "/vacation",
    name: "Vacation",
    component: () =>
      import(/* webpackChunkName: "Vacation" */ "../views/Opers/Vacation.vue"),
  },
  {
    path: "/createclass",
    name: "CreateClass",
    component: () =>
      import(
        /* webpackChunkName: "CreateClass" */ "../views/Opers/CreateClass.vue"
      ),
  },
  {
    path: "/myclass",
    name: "MyClass",
    component: () =>
      import(/* webpackChunkName: "MyClass" */ "../views/Opers/MyClass.vue"),
  },
  {
    path: "/vacationt",
    name: "VacationT",
    component: () =>
      import(
        /* webpackChunkName: "VacationT" */ "../views/Opers/VacationT.vue"
      ),
  },
  {
    path: "/setpassword",
    name: "SetPassword",
    component: () =>
      import(
        /* webpackChunkName: "SetPassword" */ "../views/Opers/SetPassword.vue"
      ),
  },
  {
    path: "/livingroom",
    name: "Livingroom",
    component: () =>
      import(
        /* webpackChunkName: "Livingroom" */ "../views/Opers/Livingroom.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
