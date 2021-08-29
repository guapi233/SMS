<template>
  <Layer title="课程管理">
    <div class="page-course">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="课程列表" name="list">
          <div class="oper-bar">
            <div class="oper-item">
              模糊查询：<el-input
                v-model="courseSeacher.name"
                style="width:300px;"
              ></el-input>
            </div>
            <div class="oper-item">
              代课教师：
              <el-select v-model="courseSeacher.teacher" placeholder="请选择">
                <el-option
                  v-for="item in teachers"
                  :key="item.usernumber"
                  :label="item.name"
                  :value="item.usernumber"
                >
                </el-option>
              </el-select>
            </div>
            <div class="oper-item">
              课程类型：
              <el-select
                v-model="courseSeacher.type"
                placeholder="请选择课程类型"
              >
                <el-option label="主修" value="main"></el-option>
                <el-option label="选修" value="sub"></el-option>
              </el-select>
            </div>
            <div class="oper-item">
              上课日：
              <el-select
                v-model="courseSeacher.day"
                multiple
                placeholder="请选择"
              >
                <el-option
                  v-for="item in dayOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="oper-item" style="text-align: right;padding:0 200px;">
            <el-button type="primary" @click="courseSeach">查询</el-button>
            <el-button @click="exportExcel">导出表格</el-button>
          </div>
          <el-table :data="courseData" stripe style="width: 100%">
            <el-table-column prop="name" label="课程名称" width="180">
            </el-table-column>
            <el-table-column prop="teacher" label="代课教师" width="180">
              <template #default="scope">
                {{
                  teachers.find((item) => item.usernumber === scope.row.teacher)
                    .name
                }}
              </template>
            </el-table-column>
            <el-table-column prop="type" label="课程类型">
              <template #default="scope">
                {{ scope.row.type === "main" ? "主修" : "选修" }}
              </template>
            </el-table-column>
            <el-table-column prop="students" label="涉及范围">
            </el-table-column>
            <el-table-column prop="beginTime" label="开始时间">
              <template #default="scope">
                {{ handleDate(scope.row.beginTime) }}
              </template>
            </el-table-column>
            <el-table-column prop="endTime" label="结束时间">
              <template #default="scope">
                {{ handleDate(scope.row.endTime) }}
              </template>
            </el-table-column>
            <el-table-column prop="day" label="上课日"> </el-table-column>
            <el-table-column label="操作">
              <template #default="scope">
                <el-button size="mini" @click="openEdit(scope.row)"
                  >编辑</el-button
                >
                <el-popconfirm
                  title="确定要删除该课程吗？"
                  @confirm="delCourse(scope.row)"
                >
                  <template #reference>
                    <el-button size="mini" type="danger">删除</el-button>
                  </template>
                </el-popconfirm>
              </template>
            </el-table-column>
          </el-table>
          <el-dialog
            title="编辑"
            v-model="dialogVisible"
            width="30%"
            :limit="1"
            :before-close="handleClose"
          >
            <div>
              <el-form :model="activeForm" label-width="80px">
                <el-form-item label="课程名称">
                  <el-input v-model="activeForm.name"></el-input>
                </el-form-item>
                <el-form-item label="代课教师">
                  <el-select
                    v-model="activeForm.teacher"
                    placeholder="请选择代课教师"
                  >
                    <el-option
                      v-for="teacher in teachers"
                      :key="teacher.usernumber"
                      :label="teacher.name"
                      :value="teacher.usernumber"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="上课地点">
                  <el-select
                    v-model="activeForm.region"
                    placeholder="请选择上课地点"
                  >
                    <el-option label="地点一" value="shanghai"></el-option>
                    <el-option label="地点二" value="beijing"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="课程周期">
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="activeForm.beginTime"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-col>
                  <el-col class="line" :span="2">-</el-col>
                  <el-col :span="11">
                    <el-date-picker
                      type="date"
                      placeholder="选择日期"
                      v-model="activeForm.endTime"
                      style="width: 100%;"
                    ></el-date-picker>
                  </el-col>
                </el-form-item>
                <el-form-item label="周安排">
                  <el-select
                    v-model="activeForm.day"
                    multiple
                    placeholder="请选择"
                  >
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
                  <el-select
                    v-model="activeForm.type"
                    placeholder="请选择课程类型"
                  >
                    <el-option label="主修" value="main"></el-option>
                    <el-option label="选修" value="sub"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input
                    type="textarea"
                    v-model="activeForm.summary"
                  ></el-input>
                </el-form-item>
              </el-form>
            </div>
            <template #footer>
              <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="editCourse">确 定</el-button>
              </span>
            </template>
          </el-dialog>
        </el-tab-pane>
        <el-tab-pane label="创建课程" name="create">
          <div class="form-wrap">
            <el-form :model="form" label-width="80px">
              <el-form-item label="课程封面">
                <el-upload
                  action="http://192.168.0.37:3000/post"
                  list-type="picture-card"
                  :auto-upload="true"
                  :on-success="setPic"
                >
                  <template #default >
                    <i class="el-icon-plus"></i>
                  </template>
                  <template #file="{file}">
                    <div v-if="form.pic">
                      <img
                        class="el-upload-list__item-thumbnail"
                        :src="file.url"
                        alt=""
                      />
                      <span class="el-upload-list__item-actions">
                        <span
                          class="el-upload-list__item-preview"
                          @click="handlePictureCardPreview(file)"
                        >
                          <i class="el-icon-zoom-in"></i>
                        </span>
                        <span
                          v-if="!disabled"
                          class="el-upload-list__item-delete"
                          @click="handleRemove(file)"
                        >
                          <i class="el-icon-delete"></i>
                        </span>
                      </span>
                    </div>
                  </template>
                </el-upload>
                <el-dialog v-model="imgPreviewShow">
                  <img width="900" :src="form.pic" alt="" />
                </el-dialog>
              </el-form-item>
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
        </el-tab-pane>
      </el-tabs>
    </div>
  </Layer>
</template>
<script>
import Layer from "./Layer.vue";
import { ref } from "vue";
import {
  getPersonList,
  addCourse,
  getAllCourse,
  editCourse as edit,
  delCourse as del,
} from "@/hook";
import { ElMessage } from "element-plus";
import { export_json_to_excel } from "../../utils/index";

export default {
  components: { Layer },
  setup() {
    const activeName = ref("list");
    const form = ref({
      pic: "",
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
        getAllCourse(courseData);
        activeName.value="list";
      }
    };
    const handleDate = (date) => {
      if (!date) return "";
      date = new Date(date);
      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")}`;
    };

    // list
    const courseData = ref([]);
    getAllCourse(courseData);
    const courseSeacher = ref({
      name: "",
      teacher: "",
      type: "",
      students: "",
      beginTime: "",
      endTime: "",
      day: "",
    });
    const courseSeach = async () => {
      getAllCourse(courseData, courseSeacher.value);
    };

    // edit
    const dialogVisible = ref(false);
    const activeForm = ref({
      name: "",
      beginTime: "",
      endTime: "",
      teacher: "",
      summary: "",
      type: "",
      day: [],
      region: "",
    });
    const openEdit = (r) => {
      for (let i in activeForm.value) {
        activeForm.value[i] = r[i];
      }
      dialogVisible.value = true;
    };
    const editCourse = async () => {
      const res = await edit(activeForm.value);
      if (res.data.state) {
        ElMessage.success("修改成功");
        for (let i in activeForm.value) {
          activeForm.value[i] = "";
        }
        getAllCourse(courseData);
        dialogVisible.value = false;
      }
    };
    const delCourse = async (r) => {
      const res = await del({ name: r.name });
      if (res.data.state) {
        ElMessage.success("删除成功");
        getAllCourse(courseData);
      }
    };

    // export
    const exportExcel = () => {
      const tHeader = [
        "课程名称",
        "代课教师",
        "课程类型",
        "涉及范围",
        "开始时间",
        "结束时间",
        "上课日",
      ];
      const filterVal = [
        "name",
        "teacher",
        "type",
        "students",
        "beginTime",
        "endTime",
        "day",
      ];

      const formatJson = (filterVal, jsonData) => {
        return jsonData.map((v) => filterVal.map((j) => v[j]));
      };
      let data = JSON.parse(JSON.stringify(courseData.value));
      data = data.map((item) => {
        if (item.type === "main") {
          item.type = "主修";
        } else {
          item.type = "选修";
        }

        item.teacher = teachers.value.find(
          (i) => i.usernumber === item.teacher
        ).name;

        return item;
      });
      data = formatJson(filterVal, data);

      export_json_to_excel({
        header: tHeader,
        filename: "课程列表",
        autoWidth: true,
        bookType: "xlsx",
        data,
      });
    };

    // 图片上传
    const imgPreviewShow = ref(false);
    const handlePictureCardPreview = (file) => {
      imgPreviewShow.value = true;
      
    };
    const handleRemove = (file) => {
      form.value.pic = "";
    };

    const setPic = (file) => form.value.pic = file.url;

    return {
      setPic,
      imgPreviewShow,
      handleRemove,
      handlePictureCardPreview,
      exportExcel,
      delCourse,
      editCourse,
      activeForm,
      openEdit,
      dialogVisible,
      courseSeacher,
      courseSeach,
      handleDate,
      courseData,
      form,
      props,
      onSubmit,
      dayOptions,
      teachers,
      studentOptions,
      activeName,
    };
  },
};
</script>
<style lang="scss">
.page-course {
  padding: 30px 30px 0;

  .oper-bar {
    display: flex;
    flex-wrap: wrap;

    .oper-item {
      margin: 10px;
    }
  }

  .form-wrap {
    width: 600px;
    margin: 50px auto 0;
  }
}
</style>
