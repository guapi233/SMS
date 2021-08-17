<template>
  <Layer title="消息">
    <div class="page-message">
      <div class="message-opers">
        asd
      </div>

      <el-scrollbar height="800px">
        <div class="message-item">
          <div class="title-bar">
            <div class="is-read">未读</div>
            <div class="type">考试</div>
            <div class="time">2018-10-19</div>
          </div>
          <div class="message-content">
            亲爱的同学，您有新的考核成绩，请查收
          </div>
        </div>
      </el-scrollbar>
    </div>
  </Layer>
</template>
<script>
import Layer from "./Opers/Layer.vue";

export default {
  components: { Layer },
  setup() {},
};
</script>
<style lang="scss">
.page-message {
  padding: 20px;

  .message-item {
    border-bottom: 1px solid #ccc;

    .title-bar {
      display: flex;
      height: 40px;

      div {
        margin-right: 20px;
      }
    }

    .message-content {
      padding: 10px;
    }
  }
}
</style>
