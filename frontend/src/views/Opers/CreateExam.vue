<template>
  <Layer title="创建测试">
    <div class="form-wrap">
      <el-form :model="form" label-width="80px">
        <el-form-item label="测试名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="所属课程">
          <el-select v-model="form.course" placeholder="请选择所属课程">
            <el-option
              v-for="course in courseList"
              :key="course.name"
              :label="course.name"
              :value="course.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测试地点">
          <el-select v-model="form.region" placeholder="请选择测试地点">
            <el-option label="地点一" value="shanghai"></el-option>
            <el-option label="地点二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="测试时间">
          <el-col :span="11">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.beginTime"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
          <el-col class="line" :span="2">-</el-col>
          <el-col :span="11">
            <el-time-picker
              placeholder="选择时间"
              v-model="form.date2"
              style="width: 100%;"
            ></el-time-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="测试对象" v-if="false">
          <el-cascader
            v-model="form.students"
            :options="studentOptions"
            :props="props"
            clearable
          ></el-cascader>
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.summary"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </Layer>
</template>
<script>
import Layer from "./Layer.vue";
import { ref } from "vue";
import { getMyCourse, addExam } from "../../hook";
import { ElMessage } from "element-plus";
import { useStore } from "vuex";

export default {
  components: { Layer },
  setup() {
    const store = useStore();
    const form = ref({
      name: "",
      region: "",
      course: "",
      beginTime: "",
      students: {},
      summary: ""
    });

    // 测试对象
    const props = { multiple: true };
    const studentOptions = [
      {
        value: "18级",
        label: "18级",
        children: [
          {
            value: "软件工程",
            label: "软件工程",
          },
          {
            value: "英语",
            label: "英语",
          },
        ],
      },
      {
        value: "19级",
        label: "19级",
        children: [
          {
            value: "软件工程",
            label: "软件工程",
          },
          {
            value: "英语",
            label: "英语",
          },
        ],
      },
    ];

    // 课程列表
    const courseList = ref([]);
    getMyCourse(courseList);

    const onSubmit = async () => {
      const res = await addExam({
        ...form.value,
        teacher: store.state.user.name
      });

      if (res.data.state === 1) {
        ElMessage.success("创建成功");
        form.value = {
          name: "",
          region: "",
          course: "",
          beginTime: "",
          students: {},
          summary: "",
        };
      }
    };

    return { form, studentOptions, props, onSubmit, courseList };
  },
};
</script>
<style lang="scss">
.form-wrap {
  width: 600px;
  margin: 200px auto 0;
}
</style>
