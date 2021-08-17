<template>
  <Layer title="我的课程">
    <div class="page-mycourse">
      <div class="course-wrap">
        <div class="course-item" @click="goto(course.name)" v-for="course in myCourse" :key="course.name">
          <div class="top">
            <div class="course-name">{{ course.name }}</div>
          </div>
          <div class="bottom">
            <span>授课教师：{{ course.teacher.name }}</span>
          </div>
        </div>
      </div>
    </div>
  </Layer>
</template>
<script>
import Layer from "./Layer.vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { ref } from "vue";
import { getMyCourse } from "../../hook";

export default {
  components: { Layer },
  setup() {
    const router = useRouter();
    const store = useStore();
    const goto = (path) => {
      router.push(`/courseInfo?name=${path}`);
    };

    const myCourse = ref([]);
    const user = store.state.user;
    getMyCourse(myCourse, {
      usernumber: user.usernumber,
      major: user.major,
      grade: user.grade   
    });

    return { goto, myCourse };
  },
};
</script>
<style lang="scss">
.page-mycourse {
  padding: 30px;
  
  .course-wrap {
    display: flex;

    .course-item {
      width: 200px;
      height: 150px;
      cursor: pointer;
      margin: 20px;

      .top {
        overflow: hidden;
        height: 100px;
        background: #ccc;
        text-align: center;

        .course-name {
          color: #fff;
          margin: 40px auto;
        }
      }

      .bottom {
        height: 30px;
        background: #eee;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        padding: 10px;
      }
    }
  }
}
</style>
