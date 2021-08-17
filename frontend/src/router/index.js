import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/Login.vue')
  },
  {
    path: '/person',
    name: 'Person',
    component: () => import(/* webpackChunkName: "Person" */ '../views/Opers/Person.vue')
  },
  {
    path: '/createexam',
    name: 'CreatEexam',
    component: () => import(/* webpackChunkName: "CreateExam" */ '../views/Opers/CreateExam.vue')
  },
  {
    path: '/myres',
    name: 'MyRes',
    component: () => import(/* webpackChunkName: "MyRes" */ '../views/Opers/MyRes.vue')
  },
  {
    path: '/createcourse',
    name: 'CreateCourse',
    component: () => import(/* webpackChunkName: "CreateCourse" */ '../views/Opers/CreateCourse.vue')
  },
  {
    path: '/mycourse',
    name: 'MyCourse',
    component: () => import(/* webpackChunkName: "MyCourse" */ '../views/Opers/MyCourse.vue')
  },
  {
    path: '/courseinfo',
    name: 'CourseInfo',
    component: () => import(/* webpackChunkName: "CourseInfo" */ '../views/Opers/CourseInfo.vue')
  },
  {
    path: '/message',
    name: 'Message',
    component: () => import(/* webpackChunkName: "Message" */ '../views/Message.vue')
  },
  {
    path: '/examinfo',
    name: 'ExamInfo',
    component: () => import(/* webpackChunkName: "ExamInfo" */ '../views/Opers/ExamInfo.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
