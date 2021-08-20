<template>
  <Layer title="变量管理">
    <div class="page-my-class">
      <div class="top">
        <div class="left">
          <div class="title">
            公告
          </div>
          <div class="notice-content">
            {{ classInfo.summary }}
          </div>
          <div class="tip">班主任：{{ classInfo.teacher.name }}</div>
        </div>
        <div class="right"></div>
      </div>
      <div class="bottom">
        <div class="title">成员</div>
        <div class="person-list">
          <div class="person-item" v-for="item in students" :key="item.name">
            <div class="img">
              <img src="../../assets/img/touxiang.png" alt="">
            </div>
            <div class="person-info">
              <p>{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layer>
</template>
<script>
import Layer from "./Layer.vue";
import { getMyClass, getPersonList } from "../../hook";
import { ref } from "vue";
import { useStore } from "vuex";

export default {
  components: { Layer },
  setup() {
    const store = useStore();
    const classInfo = ref({teacher: {}});
    const students = ref([]);

    getMyClass(classInfo, { name: store.state.user.class }, () => {
      getPersonList(students, { class: store.state.user.class });
    });
    

    return { classInfo, students };
  },
};
</script>
<style lang="scss">
.page-my-class {
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

    .title {
      font-size: 20px;
      margin-bottom: 20px;
    }

    .oper-bar {
      height: 80px;
      text-align: right;
    }

    .person-list {
      display: flex;
      flex-wrap: wrap;

      .person-item {
        width: 80px;
        cursor: pointer;
        margin: 10px;

        .img {
          height: 40px;
          font-size: 14px;
          text-align: center;
        }

        .person-info {
          text-align: center;
        }
      }
    }
  }
}
</style>
