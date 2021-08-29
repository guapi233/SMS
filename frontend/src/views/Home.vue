<template>
  <div class="home">
    <div class="header">
      <div class="message-box" @click="goto('message')">
        <svg
          t="1627873499258"
          class="icon"
          viewBox="0 0 1071 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="3253"
          width="40"
          height="40"
          fill="#fff"
        >
          <path
            d="M395.701 434.549c0 25.716-18.369 47.759-47.759 47.759-25.716 0-47.759-22.043-47.759-47.759s22.042-47.759 47.759-47.759c29.391 0 47.759 22.043 47.759 47.759z m547.394-25.716c0-198.385-183.69-360.032-411.465-360.032-231.449 0-415.138 161.647-415.138 360.032 0 117.562 66.129 227.775 176.341 293.903v113.888c0 11.021 7.348 18.369 14.694 22.042h7.348c7.348 0 11.021 0 14.694-3.674l51.434-33.065 3.674-3.674 58.78-36.739c29.391 3.674 58.78 7.348 88.171 7.348 227.775 0 411.465-161.647 411.465-360.032zM325.898 673.346c-102.865-58.78-165.321-157.972-165.321-264.513 0-172.669 165.321-315.946 371.053-315.946 202.058 0 367.379 143.278 367.379 315.946 0 172.669-165.321 315.946-367.379 315.946-29.391 0-58.78-3.674-88.171-7.348-7.348-3.674-14.694 0-18.369 0l-69.801 47.759-18.369 11.021v-84.497c0-7.348-3.674-14.694-11.021-18.369zM586.737 423.53c0 25.716-22.042 47.759-47.759 47.759s-47.759-22.042-47.759-47.759c0-29.391 22.042-47.759 47.759-47.759 25.716 0 47.759 18.369 47.759 47.759z m183.691 0c0 25.716-18.369 47.759-47.759 47.759-25.716 0-47.759-22.042-47.759-47.759 0-29.391 22.042-47.759 47.759-47.759 29.391 0 47.759 18.369 47.759 47.759z"
            p-id="3254"
          ></path>
        </svg>
        <div class="news-tip" v-if="messageList.length">{{messageList.length}}</div>
      </div>
      <div class="user">
        <el-dropdown>
          <span class="el-dropdown-link" @click="showSlide">
            <img src="../assets/img/touxiang.png" alt="" />
            {{ store.state.user.name }}
          </span>
          <template #dropdown>
            <el-dropdown-menu v-if="!store.state.isMobile">
              <el-dropdown-item @click="goto('setpassword')"
                >修改密码</el-dropdown-item
              >
              <el-dropdown-item @click="logout">安全退出</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>

    <div class="func-area">
      <div class="func-item calender">
        <div class="func-title">
          我的课表
        </div>
        <el-calendar v-if="myCourses[0] && myExam[0]">
          <template #dateCell="{data}">
            <div :class="data.isSelected ? 'is-selected' : ''">
              {{
                data.day
                  .split("-")
                  .slice(1)
                  .join("-")
              }}
              {{ data.isSelected ? "✔️" : "" }}

              <div class="calendar-wrap">
                <el-tooltip
                  v-for="item in handleCalendar(data)"
                  :key="item"
                  class="item"
                  effect="dark"
                  :content="item"
                  placement="top"
                >
                  <span class="calendar-tip">{{ item }}</span>
                </el-tooltip>
              </div>
            </div>
          </template>
        </el-calendar>
      </div>

      <div class="func-item oper-center">
        <div class="func-title">
          操作中心
        </div>
        <div class="item-list">
          <div class="oper-item" @click="goto('myclass')">
            <img src="../assets/img/class.png" alt="" />
            <p>我的班级</p>
          </div>
          <div class="oper-item" @click="goto('myres')">
            <img src="../assets/img/exam.png" alt="" />
            <p>我的测试</p>
          </div>
          <div class="oper-item" @click="goto('mycourse')">
            <img src="../assets/img/res.png" alt="" />
            <p>我的课程</p>
          </div>
          <div
            class="oper-item"
            v-if="store.state.user.authority !== 'student'"
            @click="goto('vacationt')"
          >
            <img src="../assets/img/vacation.png" alt="" />
            <p>请假</p>
          </div>
          <div class="oper-item" @click="goto('vacation')" v-else>
            <img src="../assets/img/vacation.png" alt="" />
            <p>请假</p>
          </div>
        </div>
      </div>

      <!-- 管理中心 -->
      <div
        class="func-item oper-center"
        v-if="store.state.user.authority === 'admin'"
      >
        <div class="func-title">
          管理中心
        </div>
        <div class="item-list">
          <div class="oper-item" @click="goto('person')">
            <img src="../assets/img/person_info.png" alt="" />
            <p>人员档案</p>
          </div>
          <div class="oper-item" @click="goto('createclass')">
            <img src="../assets/img/create_class.png" alt="" />
            <p>班级管理</p>
          </div>
          <div class="oper-item" @click="goto('createexam')">
            <img src="../assets/img/create_exam.png" alt="" />
            <p>创建测试</p>
          </div>
          <div class="oper-item" @click="goto('createcourse')">
            <img src="../assets/img/select_course.png" alt="" />
            <p>课程管理</p>
          </div>
          <div class="oper-item" @click="goto('livingroom')">
            <img src="../assets/img/livingbuilding.png" alt="" />
            <p>寝室管理</p>
          </div>
        </div>
      </div>
    </div>

    <transition name="slide">
      <div class="slider" v-if="sliderShow">
        <div class="slider-item" @click="goto('setpassword')">修改密码</div>
        <div class="slider-item" @click="logout">安全退出</div>
      </div>
    </transition>
    <div class="cover" v-if="sliderShow" @click="sliderShow = false"></div>
  </div>
</template>

<script>
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
import { getMyCourse, getMyExam, getMessageList } from "../hook";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();

    console.log(store.state.user);
    if (!store.state.user.name) {
      router.replace("/login");
    }

    const goto = (path) => {
      router.push(`/${path}`);
    };

    const logout = () => {
      store.commit("logout");
      window.location.reload();
    };

    // 1. 获取我的考试和课程
    const myCourses = ref([]);
    const myExam = ref([]);
    getMyCourse(myCourses, store.state.user);
    getMyExam(myExam, store.state.user);

    // 加工日历数据
    const handleDate = (date) => {
      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")}`;
    };
    const handleCalendar = (data) => {
      const showers = [];

      // 0. 加工今天的格式
      const today = data.day;
      const week = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      const toweek = week[data.date.getDay()];

      // 1. 判断今天是否有考试
      myExam.value.forEach((exam) => {
        const examDay = handleDate(new Date(exam.beginTime));

        if (examDay === today) {
          showers.push(exam.name);
        }
      });

      // 2. 判断今天是否需要上课
      myCourses.value.forEach((course) => {
        if (
          data.date >= new Date(course.beginTime) &&
          data.date <= new Date(course.endTime) &&
          course.day.includes(toweek)
        ) {
          showers.push(course.name);
        }
      });

      return showers;
    };

    const sliderShow = ref(false);
    const showSlide = () => {
      if (!store.state.isMobile) return;
      sliderShow.value = true;
    };

    // 新消息提醒
    const messageList = ref([]);
    getMessageList(messageList, { usernumber: store.state.user.usernumber, status: 1 });

    return {
      messageList,
      goto,
      store,
      logout,
      handleCalendar,
      myCourses,
      myExam,
      showSlide,
      sliderShow,
    };
  },
};
</script>
<style lang="scss">
.home {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/img/login-bg.jpg");

  .header {
    height: 44px;
    background-color: #009586e1;

    .user {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: 0 10px;

      .el-dropdown-link {
        color: #fff;
        display: flex;
        align-items: center;
      }

      img {
        width: 28px;
        height: 28px;
      }
    }
  }

  .calendar-wrap {
    display: flex;
    flex-wrap: wrap;
  }

  .calendar-tip {
    display: block;
    width: 40px;
    height: 18px;
    background: #0095868c;
    color: #fff;
    font-size: 12px;
    overflow: hidden;
    margin: 2px;
    border-radius: 2px;
    padding: 0 2px;
    box-sizing: border-box;
  }

  .func-area {
    width: 1400px;
    margin: 100px auto;
    display: flex;

    .calender {
      height: 662px;
      flex: 11;

      .el-calender {
        height: 100%;
      }
    }

    .oper-center {
      height: 100%;
      flex: 1;
    }

    .func-title {
      background-color: #009586e1;
      padding: 10px;
      color: #fff;
    }

    .is-selected {
      color: #1989fa;
    }

    .oper-center {
      display: flex;
      flex-direction: column;
      height: 703px;

      .item-list {
        background-color: #fff;
        height: 662px;

        .oper-item {
          width: 60px;
          height: 60px;
          font-size: 12px;
          text-align: center;
          margin: 10px;
          cursor: pointer;

          img {
            width: 40px;
            height: 40px;
          }

          &:hover {
            opacity: 0.7;
          }
        }
      }
    }
  }

  .header {
    display: flex;
    justify-content: flex-end;
    align-items: flex-end;

    .message-box {
      cursor: pointer;
      margin-right: 10px;
      display: flex;
      align-items: center;
      position: relative;

      .news-tip {
        width: 20px;
        height: 20px;
        line-height: 20px;
        border-radius: 50%;
        position: absolute;
        right: 0;
        top: 0;
        background-color: red;
        color: #fff;
        text-align: center;
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .home {
    width: 389vw;
    height: 390vh;
    background-size: cover;
    background-position: center;

    .header {
      height: 125px;

      .message-box {
        .icon {
          width: 100px;
          height: 100px;
          margin-right: 30px;
        }
      }

      .el-dropdown {
        font-size: 60px;
        img {
          width: 70px;
          height: 70px;
          margin-right: 10px;
        }
      }
    }

    .func-area {
      display: block;
      flex-direction: row;
      height: auto;
      margin: 50px auto;

      .func-title {
        font-size: 50px;
      }

      .calender {
        height: auto;

        .el-calendar-day {
          height: 230px !important;
          font-size: 50px;
        }

        .el-button--mini,
        .el-calendar__header,
        .el-calendar-table {
          font-size: 50px;
        }

        .calendar-tip {
          width: 170px;
          height: 50px;
          font-size: 40px;
        }
      }

      .oper-center {
        height: auto;
        .item-list {
          height: auto;
          display: flex;

          .oper-item {
            width: 150px;
            height: 150px;
            font-size: 37px;

            img {
              width: 100px;
              height: 100px;
            }
          }
        }
      }
    }

    .slider {
      width: 500px;
      height: 100%;
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      font-size: 80px;
      background-color: #fff;
      z-index: 1;
      transition: 0.3s ease;

      .slider-item {
        border-bottom: 1px solid #ccc;
        text-align: center;
      }
    }

    .slide-enter-from,
    .slide-leave-to {
      transform: translateX(500px);
    }
    .slide-enter-to,
    .slide-leave-from {
      transform: translateX(0);
    }

    .cover {
      background: rgba(0, 0, 0, 0.308);
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
    }
  }
}
</style>
