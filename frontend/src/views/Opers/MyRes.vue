<template>
  <Layer title="我的成绩">
    <div class="page-myexam-wrap">
      <el-table :data="resultList" stripe style="width: 100%">
        <el-table-column prop="name" label="考核名称" width="180">
        </el-table-column>
        <el-table-column prop="result" label="成绩"> </el-table-column>
        <el-table-column prop="result" label="是否合格"> </el-table-column>
      </el-table>
    </div>
  </Layer>
</template>
<script>
import Layer from "./Layer.vue";
import { ref } from "vue";
import { useStore } from "vuex";
import { getMyResultList } from "../../hook";

export default {
  components: { Layer },
  setup() {
    const store = useStore();
    const resultList = ref([]);

    getMyResultList(resultList, { usernumber: store.state.user.usernumber });

    return { resultList };
  },
};
</script>
<style lang="scss">
  .page-myexam-wrap {
    padding: 20px;
  }
</style>
