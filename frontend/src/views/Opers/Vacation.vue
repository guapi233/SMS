<template>
  <Layer title="变量管理">
    <div class="page-vacation">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="我要请假" name="vacation">
          <div class="vacation-wrapper">
            <div class="vacation-item">
              请假类型：
              <el-select v-model="form.type" placeholder="请选择请假类型">
                <el-option
                  v-for="item in typeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
            <div class="vacation-item">
              始终时间：
              <el-date-picker
                v-model="form.time"
                type="daterange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              >
              </el-date-picker>
            </div>
            <div class="vacation-item">
              请假缘由：<el-input
                type="textarea"
                v-model="form.reason"
              ></el-input>
            </div>
            <div class="vacation-item">审批人：{{ myClass.teacher.name }}</div>
            <div class="oper-submit">
              <el-button type="primary" @click="submit">确定</el-button>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="请假记录" name="record">
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
                <div class="top">{{ vacation.reason }}</div>
                <div class="bottom">
                  <span style="margin-right:20px;">{{
                    `${handleDate(vacation.beginTime)}——${handleDate(
                      vacation.endTime
                    )}`
                  }}</span>
                  <span>审批人：{{ vacation.passPerson }}</span>
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </Layer>
</template>
<script>
import Layer from "./Layer.vue";
import { ref } from "vue";
import { addVacation, getMyClass, getVacationList } from "../../hook";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

export default {
  components: { Layer },
  setup() {
    const store = useStore();
    const activeName = ref("vacation");
    const form = ref({
      type: "",
      time: "",
      reason: "",
    });
    const myClass = ref({
      teacher: {},
    });
    getMyClass(myClass, { name: store.state.user.class });

    const typeOptions = [
      {
        value: "事假",
        label: "事假",
      },
      {
        value: "病假",
        label: "病假",
      },
    ];

    const vacationList = ref([]);
    getVacationList(vacationList, { usernumber: store.state.user.usernumber });

    const submit = async () => {
      const res = await addVacation({
        ...form.value,
        usernumber: store.state.user.usernumber,
        beginTime: form.value.time[0],
        endTime: form.value.time[1],
        passPerson: myClass.value.teacher.name,
        id: new Date().getTime() + "",
      });

      if (res.data.state === 1) {
        ElMessage.success("申请成功，等待教师审批中...");
        for (let i in form.value) {
          form.value[i] = "";
        }
        getVacationList(vacationList, {
          usernumber: store.state.user.usernumber,
        });
      }
    };

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

    return {
      activeName,
      form,
      typeOptions,
      myClass,
      submit,
      vacationList,
      getFont,
      handleDate,
    };
  },
};
</script>
<style lang="scss">
.page-vacation {
  padding: 20px;

  .vacation-wrapper {
    padding: 20px;

    .vacation-item {
      margin: 10px;
    }
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
        flex: 7;

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
