<template>
  <Layer title="创建课程">
    <div class="form-wrap">
      <el-form :model="form" label-width="80px">
        <el-form-item label="课程名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="代课教师">
          <el-select v-model="form.teacher" placeholder="请选择代课教师">
            <el-option
              v-for="teacher in teachers"
              :key="teacher.usernumber"
              :label="teacher.name"
              :value="teacher.usernumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上课地点">
          <el-select v-model="form.region" placeholder="请选择上课地点">
            <el-option label="地点一" value="shanghai"></el-option>
            <el-option label="地点二" value="beijing"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="课程周期">
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
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.endTime"
              style="width: 100%;"
            ></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="周安排">
          <el-select v-model="form.day" multiple placeholder="请选择">
            <el-option
              v-for="item in dayOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="类型">
          <el-select v-model="form.type" placeholder="请选择课程类型">
            <el-option label="主修" value="main"></el-option>
            <el-option label="选修" value="sub"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="涉及学生" v-if="form.type === 'main'">
          <el-cascader
            v-model="form.students"
            :props="{ multiple: true }"
            :options="studentOptions"
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
import { getPersonList, addCourse } from "@/hook";
import { ElMessage } from "element-plus";

export default {
  components: { Layer },
  setup() {
    const form = ref({
      name: "",
      region: "",
      teacher: "",
      beginTime: "",
      endTime: "",
      summary: "",
      day: [],
      type: "",
      students: [],
    });

    const dayOptions = [
      { label: "周一", value: "周一" },
      { label: "周二", value: "周二" },
      { label: "周三", value: "周三" },
      { label: "周四", value: "周四" },
      { label: "周五", value: "周五" },
      { label: "周六", value: "周六" },
      { label: "周日", value: "周日" },
    ];

    // 多级选择器
    const props = { multiple: true };
    const options = [
      {
        value: 1,
        label: "东南",
        children: [
          {
            value: 2,
            label: "上海",
            children: [
              { value: 3, label: "普陀" },
              { value: 4, label: "黄埔" },
              { value: 5, label: "徐汇" },
            ],
          },
          {
            value: 7,
            label: "江苏",
            children: [
              { value: 8, label: "南京" },
              { value: 9, label: "苏州" },
              { value: 10, label: "无锡" },
            ],
          },
          {
            value: 12,
            label: "浙江",
            children: [
              { value: 13, label: "杭州" },
              { value: 14, label: "宁波" },
              { value: 15, label: "嘉兴" },
            ],
          },
        ],
      },
      {
        value: 17,
        label: "西北",
        children: [
          {
            value: 18,
            label: "陕西",
            children: [
              { value: 19, label: "西安" },
              { value: 20, label: "延安" },
            ],
          },
          {
            value: 21,
            label: "新疆维吾尔族自治区",
            children: [
              { value: 22, label: "乌鲁木齐" },
              { value: 23, label: "克拉玛依" },
            ],
          },
        ],
      },
    ];

    // 涉及学生
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

    const teachers = ref([]);
    getPersonList(teachers, { authority: "teacher" });

    const onSubmit = async () => {
      const res = await addCourse(form.value);

      if (res.data.state === 1) {
        ElMessage.success("创建成功");
        for (let key in form.value) {
          form.value[key] = "";
        }
      }
    };

    return {
      form,
      options,
      props,
      onSubmit,
      dayOptions,
      teachers,
      studentOptions,
    };
  },
};
</script>
<style lang="scss">
.form-wrap {
  width: 600px;
  margin: 200px auto 0;
}
</style>
