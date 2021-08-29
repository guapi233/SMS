<template>
  <Layer title="打卡详情">
    <div class="page-check-t">
      <div class="status">
        <span style="font-size:20px;margin-right:20px;font-weight:bold;">
          {{ route.query.course }}
        </span>
        <span style="font-size:20px;margin-right:20px;font-weight:bold;">{{
          isEnd ? "已结束" : "进行中"
        }}</span>
        <el-button v-if="!isEnd" type="danger" @click="closeCheck"
          >结束</el-button
        >
      </div>
      <div class="checked-wrap">
        <div class="title">
          已打卡学生
        </div>
        <div class="checked-list">
          <div class="person-item" v-for="item in checkedList.checked" :key="item.id">
            <div class="img">
              <img src="../../assets/img/touxiang.png" alt="" />
            </div>
            <div class="person-info">
              <p>{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="checked-wrap">
        <div class="title">
          未打卡学生
        </div>
        <div class="checked-list">
          <div class="person-item" v-for="item in checkedList.unchecked" :key="item.id">
            <div class="img">
              <img src="../../assets/img/touxiang.png" alt="" />
            </div>
            <div class="person-info">
              <p>{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layer>
</template>
<script>
import Layer from "./Layer.vue";
import { useRoute } from "vue-router";
import { ref, onUnmounted } from "vue";
import { getCheckedList, closeCheck as close, getCheckIsClose } from "../../hook";
import { ElMessage } from "element-plus";

export default {
  components: { Layer },
  setup() {
    const route = useRoute();
    const { id, course } = route.query;

    const isEnd = ref(false);
    getCheckIsClose(isEnd, { id });

    const checkedList = ref([]);
    const timer = setInterval(() => {
      getCheckedList(checkedList, { checkId: id, course });
    }, 500);

    const closeCheck = async () => {
      const res = await close({
        id,
      });

      if (res.data.state === 1) {
        ElMessage.success("关闭成功");
        isEnd.value = true;
      }
    };

    onUnmounted(() => {
      clearInterval(timer);
    });
    return { checkedList, closeCheck, isEnd, route };
  },
};
</script>
<style lang="scss">
.page-check-t {
  padding: 30px;

  .title {
    font-size: 20px;
    margin: 30px 0;
    font-weight: bold;
  }

  .checked-list {
    display: flex;
    flex-wrap: wrap;

    .person-item {
      width: 80px;
      cursor: pointer;
      margin: 10px;

      .img {
        height: 40px;
        font-size: 14px;
        text-align: center;
      }

      .person-info {
        text-align: center;
      }
    }
  }
}
</style>
