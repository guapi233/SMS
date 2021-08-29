<template>
  <Layer title="课程信息">
    <div class="page-course-info">
      <div class="top">
        <div class="left">
          <div class="title">
            公告
          </div>
          <div class="notice-content">
            {{ courseInfo.summary }}
          </div>
          <div class="tip">授课教师：{{ courseInfo.teacher.name }}</div>
        </div>
        <div class="right">
          <div class="img">
            <img :src="courseInfo.pic" alt="" />
          </div>
        </div>
      </div>
      <div class="center">
        <div class="oper-bar">
          <div class="title">打卡记录</div>
          <el-button v-if="store.state.user.authority!=='student'" type="primary" size="mini" @click="newCheck"
            >创建</el-button
          >
        </div>
        <div class="check-list">
          <el-scrollbar height="250px">
            <div class="check-item" v-for="check in checkList" :key="check.id" @click="gotoCheck(check.id)">
              <div class="isrunning" :class="[check.isEnd ? 'end' : 'run']">
                {{ check.isEnd ? "已结束" : "进行中" }}
              </div>
              <div class="time">{{ handleDate(check.beginTime) }} -- {{ handleDate(check.endTime) }}</div>
            </div>
          </el-scrollbar>
        </div>
      </div>
      <div class="bottom">
        <div class="oper-bar">
          <div class="title">考核记录</div>
          <el-button v-if="store.state.user.authority!=='student'" type="primary" size="mini" @click="goto('createexam')"
            >创建</el-button
          >
        </div>
        <div class="exam-list">
          <div
            class="exam-item"
            v-for="exam in examList"
            :key="exam.name"
            @click="goto('examinfo', exam.name)"
          >
            <div class="img">
              <svg
                t="1629079330089"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2306"
                width="40"
                height="40"
              >
                <path
                  d="M832 800V896a128 128 0 0 1-128 128H128a128 128 0 0 1-128-128V128a128 128 0 0 1 128-128h576a128 128 0 0 1 128 128v160a32 32 0 1 1-64 0V128a64 64 0 0 0-64-64H128a64 64 0 0 0-64 64v768a64 64 0 0 0 64 64h576a64 64 0 0 0 64-64v-96a32 32 0 1 1 64 0zM192 192h448a32 32 0 1 1 0 64H192a32 32 0 1 1 0-64z m0 192h448a32 32 0 1 1 0 64H192a32 32 0 1 1 0-64z m0 192h192a32 32 0 1 1 0 64H192a32 32 0 1 1 0-64z m0 192h192a32 32 0 1 1 0 64H192a32 32 0 1 1 0-64z m704.896-404.096l67.904 67.84-316.8 316.8-67.84-67.84 316.8-316.8z m22.656-22.656l11.904-11.904a32 32 0 0 1 45.248 0l22.656 22.656a32 32 0 0 1 0 45.248l-11.904 11.904-67.904-67.84zM557.504 703.36l67.84 67.84-18.496 18.56-73.472 26.112a16 16 0 0 1-20.48-20.48l26.112-73.472 18.56-18.56z"
                  fill="#303133"
                  p-id="2307"
                ></path>
              </svg>
            </div>
            <div class="exam-info">
              <p>{{ exam.name }}</p>
              <p v-if="exam.result">得分：{{ exam.result }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layer>
</template>
<script>
import Layer from "./Layer.vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { getCourseInfo, getExamList, getCheckList, addCheck } from "../../hook";
import { ref } from "vue";
import { ElMessage } from "element-plus";

export default {
  components: { Layer },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { name } = route.query;
    const store = useStore();

    // 考试列表
    const examList = ref([]);

    const courseInfo = ref({ teacher: {} });
    getCourseInfo(courseInfo, name, () => {
      getExamList(examList, {
        course: courseInfo.value.name,
        usernumber: store.state.user.usernumber,
      });
    });

    const goto = (path, name) => {
      router.push(`/${path}?name=${name}`);
    };

    // 打卡列表
    const numbers = ["4396", "7891", "0459", "2020", "9054"];
    const checkList = ref([]);
    getCheckList(checkList, {
      usernumber: store.state.user.usernumber,
      course: name,
    });
    const newCheck = async () => {
      const id = new Date().getTime();
      const res = await addCheck({
        beginTime: new Date(),
        endTime: "",
        course: name,
        code: numbers[Math.floor(Math.random() * 5)],
        id,
      });

      if (res.data.state === 1) {
        ElMessage.success("创建成功");
        router.push(`/checkt?id=${id}&course=${name}`);
      }
    };
    const handleDate = (date) => {
      if (!date) return "";

      date = new Date(date);
      return `${date.getFullYear()}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date
        .getDate()
        .toString()
        .padStart(2, "0")}/
        ${date.getHours()}:
        ${date.getMinutes()}:
        ${date.getSeconds()}`;
    };

    const gotoCheck = (id) => {
      if (store.state.user.authority === "student") {
        router.push(`/check?id=${id}&course=${name}`)
      } else {
        router.push(`/checkt?id=${id}&course=${name}`)
      }
    }
    return { courseInfo, examList, goto, newCheck, checkList, handleDate, gotoCheck, store };
  },
};
</script>
<style lang="scss">
.page-course-info {
  padding: 0 30px;

  .top {
    height: 250px;
    display: flex;
    border-bottom: 1px solid #ccc;

    .left {
      flex: 7;
      height: 100%;
      position: relative;

      .title {
        font-size: 20px;
      }

      .notice-content {
        margin-top: 20px;
      }

      .tip {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    }

    .right {
      flex: 3;

      img {
        width: 300px;
        max-height: 400px;
      }
    }
  }

  .title {
    padding: 20px 0;
    font-size: 20px;
    font-weight: bold;
  }

  .oper-bar {
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .end {
    color: rgb(245, 108, 108);
  }

  .run {
    color: rgb(103, 194, 58);
  }

  .center {
    .check-list {
      .check-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        border: 2px solid #ccc;
        padding: 10px;
        margin: 10px 0;
        cursor: pointer;
      }
    }
  }

  .bottom {
    height: 250px;
    padding-top: 30px;
    box-sizing: border-box;

    .exam-list {
      display: flex;
      flex-wrap: wrap;

      .exam-item {
        width: 80px;
        cursor: pointer;
        margin: 10px;

        .img {
          height: 40px;
          font-size: 14px;
          text-align: center;
        }
      }
    }
  }
}
</style>
