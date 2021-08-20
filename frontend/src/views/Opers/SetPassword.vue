<template>
  <Layer title="变量设置">
    <div class="page-set-password">
      <el-form
        :model="ruleForm"
        ref="ruleFormBox"
        status-icon
        :rules="rules"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="旧密码" prop="oldPass">
          <el-input
            v-model.number="ruleForm.oldPass"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="ruleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </Layer>
</template>
<script>
import Layer from "./Layer.vue";
import { ref } from "vue";
import { setPassword } from "../../hook";
import { useStore } from "vuex";
import { ElMessage } from "element-plus";

export default {
  components: { Layer },
  setup() {
    const store = useStore();
    const ruleFormBox = ref();
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          ruleFormBox.value.validateField("checkPass");
        }
        callback();
      }
    };

    const ruleForm = ref({
      pass: "",
      checkPass: "",
      oldPass: "",
    });
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== ruleForm.value.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    const rules = {
      pass: [{ validator: validatePass, trigger: "blur" }],
      checkPass: [{ validator: validatePass2, trigger: "blur" }],
    };

    const submitForm = async () => {
      const res = await setPassword({
        usernumber: store.state.user.usernumber,
        password: ruleForm.value.pass,
      });

      if (res.data.state === 1) {
        ElMessage.success("修改成功");
        for (let i in ruleForm.value) {
          ruleForm.value[i] = "";
        }
      }
    };

    return { submitForm, ruleForm, rules, ruleFormBox };
  },
};
</script>
<style lang="scss">
.page-set-password {
  padding: 20px;
}
</style>
