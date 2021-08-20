<template>
  <Layer title="变量管理">
    <div class="page-create-class">
      <el-form :model="form" label-width="80px">
        <el-form-item label="班级名称">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="班主任">
          <el-select v-model="form.teacher" placeholder="请选择班主任">
            <el-option
              v-for="teacher in teachers"
              :key="teacher.usernumber"
              :label="teacher.name"
              :value="teacher.usernumber"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所属专业">
          <el-select v-model="form.major" placeholder="请选择">
            <el-option
              v-for="item in majorOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
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
import { getPersonList, addClass } from "@/hook";
import { ref } from "vue";
import { ElMessage } from "element-plus";

export default {
  components: { Layer },
  setup() {
    const form = ref({
      name: "",
      teacher: "",
      summary: "",
      major: "",
    });
    const teachers = ref([]);
    getPersonList(teachers, { authority: "teacher" });

    const majorOptions = [
      {
        label: "软件工程",
        value: "软件工程",
      },
      {
        label: "英语",
        value: "英语",
      },
    ];

    const onSubmit = async () => {
      const res = await addClass(form.value);

      if (res.data.state === 1) {
        ElMessage.success("创建成功");
        for (let i in form.value) {
          form.value[i] = "";
        }
      } 
    }

    return { form, teachers, majorOptions, onSubmit };
  },
};
</script>
<style lang="scss">
.page-create-class {
  padding: 20px;
}
</style>
