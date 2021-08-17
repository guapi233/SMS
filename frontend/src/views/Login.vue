<template>
  <div class="login-page">
    <div class="login-box">
      <p class="title">登录</p>
      <el-input placeholder="账号" v-model="usernumber" class="username"></el-input>
      <el-input placeholder="密码" show-password v-model="password" class="password"></el-input>
      <el-button type="primary" size="mini" class="login-btn" @click="goLog">登录</el-button>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { login } from "../hook";
import { ElMessage } from 'element-plus';
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  setup() {
    const usernumber = ref("");
    const password = ref("");
    const router = useRouter();
    const store = useStore();

    const goLog = async () => {
      const res = await login(usernumber.value, password.value);
      
      if (res.data.state === 1) {
        ElMessage.success("登录成功");
        router.replace("/");
        store.commit("setUser", res.data.data);
      } else {
        ElMessage.error(res.data.data);
      }
    }

    return { usernumber, password, goLog };
  }
}
</script>

<style lang="scss">
.login-page {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/img/login-bg.jpg");

  .login-box {
    width: 300px;
    height: 180px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(255, 255, 255, 0.863);
    padding: 20px 20px 30px;
    
    .title {
      text-align: center;
      margin: 10px 0;
      color: rgb(119, 115, 115);
      font-size: 18px;
    }

    .username, .password {
      margin-bottom: 10px;
    }

    .login-btn {
      margin: 10px 0;
      width: 100%;
    }
  }
}
</style>
