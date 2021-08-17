<template>
  <Layer title="变量管理">
    <div class="page-examinfo">
      <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="得分概览" name="statistic">
          <div class="statistic">
            <div class="left">
              <el-table :data="resultList" stripe style="width: 100%">
                <el-table-column prop="usernumber" label="学号" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="result" label="得分"></el-table-column>
                <el-table-column
                  prop="qualified"
                  label="是否及格"
                ></el-table-column>
              </el-table>
            </div>
            <div class="right">
              <div class="chart" ref="chartDom"></div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="考核评分" name="givePoint">
          <div>
            <div class="oper-area">
              <el-button type="primary">快速录入</el-button>
              <el-button>导出表格</el-button>
            </div>
            <div class="form-wrap">
              <el-form :model="form" label-width="80px">
                <el-form-item label="学生学号">
                  <el-input v-model="form.usernumber"></el-input>
                </el-form-item>
                <el-form-item label="得分">
                  <el-input v-model="form.result"></el-input>
                </el-form-item>
                <el-form-item label="是否及格">
                  <el-switch v-model="form.qualified"></el-switch>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="onSubmit">确定</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </Layer>
</template>
<script>
import Layer from "./Layer.vue";
import { ref, onMounted } from "vue";
import * as echarts from "echarts";
import { addResult, getResultList } from "../../hook";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";

export default {
  components: { Layer },
  setup() {
    const activeName = ref("statistic");
    const route = useRoute();
    const chartDom = ref();
    const form = ref({
      usernumber: "",
      result: "",
      qualified: false,
    });

    const { name } = route.query;
    const onSubmit = async () => {
      const res = await addResult({
        name,
        ...form.value,
      });

      if (res.data.state === 1) {
        form.value = {
          usernumber: "",
          result: "",
          qualified: false,
        };
        ElMessage.success("评分成功");
      }
    };

    const initChart = () => {
      const staChart = echarts.init(chartDom.value);
      staChart.setOption({
        tooltip: {
          trigger: "item",
        },
        legend: {
          top: "5%",
          left: "center",
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["40%", "70%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "#fff",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "40",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: chartData,
          },
        ],
      });
    };

    // 统计表格
    const resultList = ref([]);
    const chartData = [
      { value: 0, name: "及格" },
      { value: 0, name: "不及格" },
    ];
    getResultList(resultList, { name }, () => {
      resultList.value.forEach((result) => {
        result.qualified ? chartData[0].value++ : chartData[1].value++;
      });

      initChart();
    });

    return { form, activeName, resultList, chartDom, onSubmit };
  },
};
</script>
<style lang="scss">
.page-examinfo {
  padding: 20px;
}

.oper-area {
  padding: 20px;
  text-align: right;
}

.form-wrap {
  width: 600px;
  margin: 200px auto 0;
}

.chart {
  width: 400px;
  height: 400px;
}

.statistic {
  display: flex;
  padding: 20px;

  .left,
  .right {
    flex: 1;
  }

  .right {
    .chart {
      margin: 0 auto;
    }
  }
}
</style>
