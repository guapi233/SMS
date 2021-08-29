<template>
  <Layer title="打卡">
    <div class="page-check">
      <div v-if="!isChecked">
        请输入打卡号码：<el-input v-model="code"></el-input>
        <div style="text-align:right;padding: 30px;">
          <el-button type="primary" @click="check">打卡</el-button>
        </div>
      </div>
      <div v-else>
        您已打卡
      </div>
    </div>
  </Layer>
</template>
<script>
import Layer from "./Layer.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { getIsCheck, addChecking } from "../../hook";
import { ElMessage } from "element-plus";

export default {
  components: { Layer },
  setup() {
    const code = ref("");
    const store = useStore();
    const route = useRoute();
    const { id } = route.query;

    const isChecked = ref(false);
    getIsCheck(isChecked, {
      checkId: id,
      usernumber: store.state.user.usernumber,
    });

    const check = async () => {
      const res = await addChecking({
        id: new Date().getTime(),
        usernumber: store.state.user.usernumber,
        checkId: id,
        time: new Date(),
        code: code.value
      });

      if (res.data.state === 1) {
        ElMessage.success("打卡成功");
        isChecked.value = true;
      } else {
        ElMessage.error(res.data.data);
      }
    };

    return { code, isChecked, check };
  },
};
</script>
<style lang="scss">
.page-check {
  padding: 30px;
}
</style>
