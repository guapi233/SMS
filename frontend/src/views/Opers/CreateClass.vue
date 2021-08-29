<template>
  <Layer title="专业班级管理">
    <div class="page-create-class">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="专业列表" name="major">
          <div class="opers-bar">
            模糊查询：<el-input
              v-model="majorSearcher"
              style="width:300px;margin-right:20px;"
            ></el-input>
            <el-button @click="majorSearch" type="primary">查询</el-button>
            <el-button @click="exportMajor">导出表格</el-button>
          </div>
          <el-table :data="majorData" stripe style="width: 100%">
            <el-table-column prop="name" label="专业名称" width="180">
            </el-table-column>
            <el-table-column prop="summary" label="专业介绍"> </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row, 'major')"
                  >编辑</el-button
                >
                <el-popconfirm
                  title="确定要删除该专业吗？"
                  @confirm="handleDelete(scope.$index, scope.row, 'major')"
                >
                  <template #reference>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="班级列表" name="list">
          <div class="opers-bar">
            模糊查询：<el-input
              v-model="classSearcher"
              style="width:300px;margin-right:20px;"
            ></el-input>
            <el-select
              v-model="belongMajor"
              placeholder="请选择所属专业"
              style="margin-right:20px;"
            >
              <el-option
                v-for="item in [{ id: 'asd', name: '全专业' }, ...majorData]"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
            <el-button @click="classSearch" type="primary">查询</el-button>
            <el-button @click="exportClass">导出表格</el-button>
          </div>
          <el-table :data="classData" stripe style="width: 100%">
            <el-table-column prop="name" label="班级名称" width="180">
            </el-table-column>
            <el-table-column prop="major" label="所属专业"> </el-table-column>
            <el-table-column prop="teacher" label="班主任"> </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row, 'class')"
                  >编辑</el-button
                >
                <el-popconfirm
                  title="确定要删除该班级吗？"
                  @confirm="handleDelete(scope.$index, scope.row, 'class')"
                >
                  <template #reference>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="创建专业" name="createmajor">
          <el-form :model="majorForm" label-width="80px">
            <el-form-item label="专业名称">
              <el-input v-model="majorForm.name"></el-input>
            </el-form-item>
            <el-form-item label="专业介绍">
              <el-input type="textarea" v-model="majorForm.summary"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="majorSubmit"
                >立即创建</el-button
              >
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="创建班级" name="create">
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
        </el-tab-pane>
      </el-tabs>

      <el-dialog
        title="编辑"
        v-model="dialogVisible"
        width="30%"
        :before-close="handleClose"
      >
        <div>
          <div v-if="dialogType === 'major'">
            专业名称: <el-input v-model="active.name"></el-input> 专业介绍:
            <el-input v-model="active.summary"></el-input>
          </div>
          <div v-else>
            班级名称:
            <el-input v-model="active.name"></el-input> 所属专业:<br />
            <el-select v-model="active.major" placeholder="请选择所属专业">
              <el-option
                v-for="item in majorData"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              >
              </el-option>
            </el-select>
            <br />
            班主任:<br />
            <el-select v-model="active.teacher" placeholder="请选择班主任">
              <el-option
                v-for="item in teachers"
                :key="item.usernumber"
                :label="item.name"
                :value="item.usernumber"
              >
              </el-option>
            </el-select>
          </div>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="edit(dialogType)">确 定</el-button>
          </span>
        </template>
      </el-dialog>
    </div>
  </Layer>
</template>
<script>
import Layer from "./Layer.vue";
import {
  getPersonList,
  addClass,
  getMajorList,
  addMajor,
  delMajor,
  editMajor,
  getClassList,
  editClass,
  delClass,
} from "@/hook";
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { export_json_to_excel } from "../../utils/index";

export default {
  components: { Layer },
  setup() {
    const activeName = ref("major");
    const form = ref({
      name: "",
      teacher: "",
      summary: "",
      major: "",
    });
    const teachers = ref([]);
    getPersonList(teachers, { authority: "teacher" });
    const dialogVisible = ref(false);
    const dialogType = ref("");
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
    };

    // major
    const majorData = ref([]);
    getMajorList(majorData);
    const majorForm = ref({
      name: "",
      summary: "",
    });
    const majorSubmit = async () => {
      const res = await addMajor({
        id: new Date().getTime() + "",
        ...majorForm.value,
      });

      if (res.data.state === 1) {
        ElMessage.success("创建成功");
        for (let i in majorForm.value) {
          majorForm.value[i] = "";
        }
      }
    };
    const majorSearcher = ref("");
    const majorSearch = async () => {
      getMajorList(majorData, { name: majorSearcher.value });
    };
    const classSearcher = ref("");
    const belongMajor = ref("全专业");
    const classSearch = async () => {
      const data = { name: classSearcher.value };
      belongMajor.value !== "全专业" && (data.major = belongMajor.value);
      getClassList(classData, data);
    };

    // class
    const classData = ref([]);
    getClassList(classData);

    const active = ref({
      name: "",
      summary: "",
    });

    const handleClick = () => {
      getPersonList(teachers, { authority: "teacher" });
      getMajorList(majorData);
      getClassList(classData);
    };
    const handleDelete = async (index, row, t) => {
      if (t === "major") {
        const res = await delMajor({ name: row.name });
        if (res.data.state) ElMessage.success("删除成功");
        getMajorList(majorData);
      } else {
        const res = await delClass({ name: row.name });
        if (res.data.state) ElMessage.success("删除成功");
        getClassList(classData);
      }
    };
    const handleEdit = async (index, row, t) => {
      dialogType.value = t;
      active.value = {};
      dialogVisible.value = true;
      if (t === "major") {
        (active.value.id = row.id),
          (active.value.name = row.name),
          (active.value.summary = row.summary);
      } else {
        (active.value._id = row._id),
          (active.value.name = row.name),
          (active.value.teacher = teachers.value.find(
            (item) => item.name === row.teacher
          ).usernumber);
        active.value.major = row.major;
      }
    };
    const edit = async (t) => {
      if (t === "major") {
        const res = await editMajor(active.value);
        if (res.data.state) {
          ElMessage.success("修改成功");
          dialogVisible.value = false;
          getMajorList(majorData);
        }
      } else {
        const res = await editClass(active.value);
        if (res.data.state) {
          ElMessage.success("修改成功");
          dialogVisible.value = false;
          getClassList(classData);
        }
      }
    };

    // export
    const exportMajor = () => {
      const tHeader = ["专业名称", "专业介绍"];
      const filterVal = ["name", "summary"];

      const formatJson = (filterVal, jsonData) => {
        return jsonData.map((v) => filterVal.map((j) => v[j]));
      };
      let data = JSON.parse(JSON.stringify(majorData.value));
      data = formatJson(filterVal, data);

      export_json_to_excel({
        header: tHeader,
        filename: "专业列表",
        autoWidth: true,
        bookType: "xlsx",
        data,
      });
    };
    const exportClass = () => {
      const tHeader = ["班级名称", "所属专业", "班主任"];
      const filterVal = ["name", "major", "teacher"];

      const formatJson = (filterVal, jsonData) => {
        return jsonData.map((v) => filterVal.map((j) => v[j]));
      };
      let data = JSON.parse(JSON.stringify(classData.value));
      data = formatJson(filterVal, data);

      export_json_to_excel({
        header: tHeader,
        filename: "班级列表",
        autoWidth: true,
        bookType: "xlsx",
        data,
      });
    };

    return {
      exportMajor,
      exportClass,
      classSearch,
      classSearcher,
      belongMajor,
      classData,
      majorSearch,
      majorSearcher,
      edit,
      active,
      dialogVisible,
      dialogType,
      handleEdit,
      handleClick,
      handleDelete,
      form,
      teachers,
      majorOptions,
      onSubmit,
      activeName,
      majorData,
      majorForm,
      majorSubmit,
    };
  },
};
</script>
<style lang="scss">
.page-create-class {
  padding: 20px;
}
</style>
