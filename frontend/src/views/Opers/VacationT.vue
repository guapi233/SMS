<template>
  <Layer title="变量管理">
    <div class="page-vacation-t">
      <div class="page-top">
        <div class="title">处于休假状态的同学</div>
        <div class="vacation-person-list">
          <div class="person-item" v-for="item in students" :key="item.name">
            <div class="img">
              <img src="../../assets/img/touxiang.png" alt="" />
            </div>
            <div class="person-info">
              <p>{{ item.userInfo.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bottom">
        <div class="title">请假记录</div>
        <div class="record-list">
          <div
            class="record-item"
            v-for="vacation in vacationList"
            :key="vacation.id"
          >
            <div class="left" :class="[vacation.passed]">
              {{ getFont(vacation.passed) }}
            </div>
            <div class="right">
              <div class="top">
                <div class="reason">{{ vacation.reason }}</div>
                <div
                  class="vacation-opers"
                  v-if="vacation.passed === 'pendding'"
                >
                  <el-button
                    type="danger"
                    size="mini"
                    @click="setVac(vacation.id, 'reject')"
                    >驳回</el-button
                  >
                  <el-button
                    type="success"
                    size="mini"
                    @click="setVac(vacation.id, 'resolve')"
                    >通过</el-button
                  >
                </div>
              </div>
              <div class="bottom">
                <span style="margin-right:20px;">{{
                  `${handleDate(vacation.beginTime)}——${handleDate(
                    vacation.endTime
                  )}`
                }}</span>
                <span>申请人：{{ vacation.userInfo.name }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layer>
</template>
<script>
import Layer from "./Layer.vue";
import { ref, computed } from "vue";
import { getVacationList, setVacation } from "../../hook";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

export default {
  components: { Layer },
  setup() {
    const store = useStore();
    const vacationList = ref([]);
    getVacationList(vacationList, { passPerson: store.state.user.name });

    const getFont = (t) => {
      if (t === "pendding") {
        return "审批中";
      } else if (t === "resolve") {
        return "通过";
      } else {
        return "驳回";
      }
    };
    const handleDate = (date) => {
      date = new Date(date);
      return `${date.getFullYear()}/${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}/${date
        .getDate()
        .toString()
        .padStart(2, "0")}`;
    };

    const setVac = async (id, passed) => {
      const res = await setVacation({
        id,
        passed,
      });
      if (res.data.state === 1) {
        ElMessage.success("批假成功");
        vacationList.value.forEach((item) => {
          if (item.id === id) {
            item.passed = passed;
          }
        });
      }
    };

    const students = computed(() => {
      const today = new Date();
      return vacationList.value.filter(
        (vacation) =>
          new Date(vacation.beginTime) <= today &&
          new Date(vacation.endTime) >= today
      );
    });

    return { vacationList, getFont, handleDate, setVac, students };
  },
};
</script>
<style lang="scss">
.page-vacation-t {
  padding: 20px;
  color: rgb(119, 116, 116);

  .vacation-person-list {
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

  .title {
    font-size: 20px;
    color: #000;
  }

  .page-top {
    height: 300px;
    border-bottom: 1px solid #ccc;
  }

  .title {
    margin: 10px 0;
  }

  .record-list {
    padding: 20px;

    .record-item {
      margin-bottom: 20px;
      border-bottom: 1px solid #ccc;
      padding: 10px 0;
      height: 40px;
      display: flex;
      align-items: center;

      .left {
        flex: 3;
        font-size: 20px;
      }
      .right {
        flex: 10;

        .top {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .bottom {
          text-align: right;
        }
      }
    }

    .pendding {
      color: rgb(64, 158, 255);
    }

    .resolve {
      color: rgb(103, 194, 58);
    }

    .reject {
      color: rgb(245, 108, 108);
    }
  }
}
</style>
