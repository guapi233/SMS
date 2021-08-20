<template>
  <Layer title="消息">
    <div class="page-message">
      <div class="newmes" v-if="unreads.length">
        <div class="title">新消息</div>
        <el-scrollbar height="300px">
          <div
            class="message-item"
            v-for="message in unreads"
            :key="message.id"
          >
            <div class="title-bar">
              <div class="type">{{ message.type }}</div>
              <div class="time">发布日期：{{ handleDate(message.time) }}</div>
              <div class="teacher">发布人：{{ message.by }}</div>
            </div>
            <div class="message-content">
              {{ message.content }}
            </div>
          </div>
        </el-scrollbar>
      </div>

      <div class="oldmes">
        <div class="title">历史消息</div>
        <el-scrollbar height="400px">
          <div
            class="message-item"
            v-for="message in isreads"
            :key="message.id"
          >
            <div class="title-bar">
              <div class="type">{{ message.type }}</div>
              <div class="time">发布日期：{{ handleDate(message.time) }}</div>
              <div class="teacher">发布人：{{ message.by }}</div>
            </div>
            <div class="message-content">
              {{ message.content }}
            </div>
          </div>
        </el-scrollbar>
      </div>
    </div>
  </Layer>
</template>
<script>
import Layer from "./Opers/Layer.vue";
import { getMessageList, readMes } from "../hook";
import { ref, computed } from "vue";
import { useStore } from "vuex";

export default {
  components: { Layer },
  setup() {
    const store = useStore();
    const messageList = ref([]);
    getMessageList(messageList, { usernumber: store.state.user.usernumber });

    const unreads = computed(() => {
      const res = messageList.value.filter((message) => {
        if (message.status === 1) {
          readMes({
            id: message.id,
          });
        }

        return message.status === 1;
      });

      return res;
    });
    const isreads = computed(() => {
      return messageList.value.filter((message) => message.status === 0);
    });

    const handleDate = (date) => {
      console.log(date, new Date(+date))
      date = new Date(+date);
      return `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date
        .getDate()
        .toString()
        .padStart(2, "0")}`;
    };

    return { unreads, isreads, handleDate };
  },
};
</script>
<style lang="scss">
.page-message {
  padding: 20px;

  .newmes,
  .oldmes {
    .title {
      font-size: 20px;
      margin: 20px 0;
      font-weight: bold;
    }
  }

  .message-item {
    border-bottom: 1px solid #ccc;
    margin: 20px 0;

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
