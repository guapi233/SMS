<template>
  <Layer title="变量管理">
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
      <div class="bottom">
        <div class="oper-bar">
          <el-button type="primary" @click="goto('createexam')">添加</el-button>
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
import { getCourseInfo, getExamList } from "../../hook";
import { ref } from "vue";

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
      getExamList(examList, { course: courseInfo.value.name, usernumber: store.state.user.usernumber });
    });

    const goto = (path, name) => {
      router.push(`/${path}?name=${name}`);
    };

    return { courseInfo, examList, goto };
  },
};
</script>
<style lang="scss">
.page-course-info {
  padding: 30px;

  .top {
    height: 400px;
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
    }
  }

  .bottom {
    height: 460px;
    padding-top: 30px;
    box-sizing: border-box;

    .oper-bar {
      height: 80px;
      text-align: right;
    }

    .exam-list {
      .exam-item {
        width: 80px;
        cursor: pointer;

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
