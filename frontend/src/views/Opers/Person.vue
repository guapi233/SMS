<template>
  <Layer title="人员信息">
    <div class="page-person-wrap">
      <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
        <el-tab-pane label="学生" name="student">
          <div class="shaixuan-box">
            专业：
            <el-select v-model="Xmajor" placeholder="请选择">
              <el-option
                v-for="item in majorOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            班级：
            <el-select v-model="Xclass" placeholder="请选择">
              <el-option
                v-for="item in classOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            性别：
            <el-select v-model="Xsex" placeholder="请选择">
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <br />
            <div class="search">
              <span>搜索：</span>
              <div class="input">
                <el-input v-model="n" placeholder="请输入学号或姓名"></el-input>
              </div>
              <el-button type="primary" class="btn" @click="search"
                >搜索</el-button
              >
            </div>
            <div class="oper-box">
              <el-button type="primary" size="mini" @click="openAdd"
                >添加学生</el-button
              >
              <el-button size="mini">导出表格</el-button>
            </div>
          </div>
          <div class="student-area">
            <el-table :data="students" style="width: 100%" stripe>
              <el-table-column prop="name" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="usernumber" label="学号" width="180">
              </el-table-column>
              <el-table-column prop="gender" label="性别"></el-table-column>
              <el-table-column prop="major" label="专业"></el-table-column>
              <el-table-column prop="class" label="班级"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>

        <!-- 教职工 -->
        <el-tab-pane label="教职工" name="teacher">
          <div class="shaixuan-box">
            专业：
            <el-select v-model="Xmajor" placeholder="请选择">
              <el-option
                v-for="item in majorOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            班级：
            <el-select v-model="Xclass" placeholder="请选择">
              <el-option
                v-for="item in classOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            性别：
            <el-select v-model="Xsex" placeholder="请选择">
              <el-option
                v-for="item in sexOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
            <br />
            <div class="search">
              <span>搜索：</span>
              <div class="input">
                <el-input v-model="n" placeholder="请输入工号或姓名"></el-input>
              </div>
              <el-button type="primary" class="btn" @click="search(true)"
                >搜索</el-button
              >
            </div>
            <div class="oper-box">
              <el-button type="primary" size="mini" @click="openAdd(true)"
                >添加教职工</el-button
              >
              <el-button size="mini">导出表格</el-button>
            </div>
          </div>
          <div class="teacher-area">
            <el-table :data="teachers" style="width: 100%" stripe>
              <el-table-column prop="name" label="姓名" width="180">
              </el-table-column>
              <el-table-column prop="usernumber" label="工号" width="180">
              </el-table-column>
              <el-table-column prop="gender" label="性别"></el-table-column>
              <el-table-column prop="major" label="专业"></el-table-column>
              <el-table-column prop="class" label="班级"></el-table-column>
            </el-table>
          </div>
        </el-tab-pane>
      </el-tabs>

      <el-dialog title="添加人员" v-model="isAddOpen">
        学号：<el-input v-model="newer.usernumber"></el-input> 姓名：<el-input
          v-model="newer.name"
        ></el-input>
        年级：<el-input
          v-model="newer.grade"
        ></el-input>
        专业：
        <el-select v-model="newer.major" placeholder="请选择">
          <el-option
            v-for="item in majorOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <br />
        班级：
        <el-select v-model="newer.class" placeholder="请选择">
          <el-option
            v-for="item in classOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <br />
        性别：
        <el-select v-model="newer.gender" placeholder="请选择">
          <el-option
            v-for="item in sexOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          >
          </el-option>
        </el-select>
        <div class="add-btn">
          <el-button type="primary" @click="addP">确定</el-button>
        </div>
      </el-dialog>
    </div>
  </Layer>
</template>
<script>
import Layer from "./Layer.vue";
import { ref } from "vue";
import { getPersonList, addPerson } from "@/hook";
import { ElMessage } from "element-plus";

export default {
  components: { Layer },
  setup() {
    const activeName = "student";
    const Xsex = ref("");
    const Xclass = ref("");
    const Xmajor = ref("");
    const n = ref("");

    const sexOptions = [
      {
        label: "男",
        value: "男",
      },
      {
        label: "女",
        value: "女",
      },
    ];

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

    const classOptions = [
      {
        label: "软工一班",
        value: "软工一班",
      },
      {
        label: "软工二班",
        value: "软工二班",
      },
    ];

    const students = ref([]);
    const teachers = ref([]);
    const newer = ref({
      name: "",
      usernumber: "",
      grade: "",
      gender: "",
      class: "",
      major: "",
    });
    const search = (isT) => {
      const wheres = {};
      Xsex.value && (wheres.gender = Xsex.value);
      Xmajor.value && (wheres.major = Xmajor.value);
      Xclass.value && (wheres.class = Xclass.value);

      if (n.value) {
        if (isNaN(+n.value)) {
          wheres.name = n.value;
        } else {
          wheres.usernumber = n.value;
        }
      }

      if (isT === true) {
        getPersonList(teachers, {
          ...wheres,
          authority: "teacher",
        });
      } else {
        getPersonList(students, {
          ...wheres,
          authority: "student",
        });
      }
    };

    const isAddOpen = ref(false);
    const openAdd = () => {
      isAddOpen.value = true;
    };
    const addP = async (isT) => {
      const obj = {
        ...newer.value,
        password: newer.value.usernumber
      };
      isT === true ? (obj.authority = "teacher") : (obj.authority = "student");
      const res = await addPerson(obj);

      if (res.data.state === 1) {
        ElMessage.success("添加成功");
        for (let key in newer.value) {
          newer.value[key] = "";
        }
        isAddOpen.value = false;
      }
    };

    return {
      activeName,
      Xsex,
      Xclass,
      Xmajor,
      sexOptions,
      students,
      majorOptions,
      classOptions,
      search,
      n,
      teachers,
      addPerson,
      isAddOpen,
      openAdd,
      newer,
      addP,
    };
  },
};
</script>
<style lang="scss">
.page-person-wrap {
  padding: 15px;

  .student-area {
    margin-top: 10px;
  }

  .search {
    display: flex;
    margin: 10px 0;
    align-items: center;

    .input {
      width: 300px;
    }

    .btn {
      margin-left: 20px;
    }
  }

  .add-btn {
    text-align: right;
    margin: 10px 0;
  }
}
</style>
