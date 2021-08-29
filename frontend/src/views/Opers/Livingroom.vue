<template>
  <Layer title="寝室管理">
    <div class="page-livingroom">
      <div class="opers-bar">
        <el-button @click="dialogVisible = true" type="primary"
          >添加寝室区域</el-button
        >
      </div>
      <div class="living-content">
        <el-collapse v-model="activeNames">
          <el-collapse-item
            v-for="lvb in lvbuildingList"
            :key="lvb.name"
            :name="lvb.name"
          >
            <template #title>
              <div class="collapse-title">
                <span>{{ lvb.name }}</span>
              </div>
            </template>
            <div class="room-opers">
              <svg
                @click="dialogVisible2 = true"
                t="1629449546090"
                class="addroom-icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="2326"
                width="25"
                height="25"
              >
                <path
                  d="M512 118.31808c217.15456 0 393.68704 176.52736 393.68704 393.68192S729.15456 905.68704 512 905.68704 118.31808 729.15456 118.31808 512 294.84544 118.31808 512 118.31808M512 31.744C246.9632 31.744 31.744 246.9632 31.744 512s215.2192 480.256 480.256 480.256 480.256-215.2192 480.256-480.256S777.0368 31.744 512 31.744z"
                  p-id="2327"
                ></path>
                <path
                  d="M778.97216 555.04384H245.02784c-18.86208 0-33.85344-19.34336-33.85344-43.04384 0-23.69536 14.99136-43.04384 33.85344-43.04384h533.4528c18.8672 0 33.85344 19.34336 33.85344 43.04384 0.49152 24.18176-14.98624 43.04384-33.36192 43.04384z"
                  p-id="2328"
                ></path>
                <path
                  d="M468.95616 778.97216V245.02784c0-18.86208 19.34336-33.85344 43.04384-33.85344s43.04384 14.99136 43.04384 33.85344v533.4528c0 18.8672-19.34336 33.85344-43.04384 33.85344-24.18176 0.49152-43.04384-14.98624-43.04384-33.36192z"
                  p-id="2329"
                ></path>
              </svg>
            </div>
            <div class="room-list">
              <div
                class="room-item"
                v-for="room in lvb.rooms"
                :key="room.name"
                @click="openRoomConfig(room)"
              >
                <img src="../../assets/img/livingroom.png" alt="" />
                <p>{{ room.name }}</p>
                <p>{{ `${room.including}/${room.max}` }}</p>
              </div>
            </div>
            <el-dialog title="添加寝室" v-model="dialogVisible2" width="30%">
              <div class="adder">
                寝室名称：<el-input v-model="newRoomName"></el-input>
                最大容纳数：<el-input v-model="max"></el-input>
              </div>
              <template #footer>
                <span class="dialog-footer">
                  <el-button @click="dialogVisible2 = false">取 消</el-button>
                  <el-button type="primary" @click="addRoom(lvb.name)"
                    >确 定</el-button
                  >
                </span>
              </template>
            </el-dialog>
          </el-collapse-item>
        </el-collapse>
      </div>

      <el-dialog title="添加寝室区域" v-model="dialogVisible" width="30%">
        <div class="adder">
          区域名称：<el-input v-model="newBuildName"></el-input>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="addBuild">确 定</el-button>
          </span>
        </template>
      </el-dialog>

      <el-dialog :title="activeRoom.name" v-model="dialogVisible3" width="30%">
        <div class="adder">
          <div class="user-live">
            <div
              class="person-item"
              v-for="item in activeRoom.students"
              :key="item.name"
            >
              <div class="img">
                <img src="../../assets/img/touxiang.png" alt="" />
              </div>
              <div class="person-info">
                <p>{{ item.name }}</p>
              </div>
            </div>
          </div>
          学号：<el-input v-model="usernumber"></el-input>
          <el-button type="primary" size="mini" @click="addToRoom">添加</el-button>
        </div>
      </el-dialog>
    </div>
  </Layer>
</template>
<script>
import Layer from "./Layer.vue";
import { ref } from "vue";
import { addLvBuilding, addLvRoom, getLvbuildingList, addStudent } from "../../hook";
import { ElMessage } from "element-plus";

export default {
  components: { Layer },
  setup() {
    const activeNames = ref([""]);
    const dialogVisible = ref(false);
    const dialogVisible2 = ref(false);
    const dialogVisible3 = ref(false);
    const newBuildName = ref("");
    const newRoomName = ref("");
    const max = ref("");

    const lvbuildingList = ref([]);
    getLvbuildingList(lvbuildingList);

    const addBuild = async () => {
      const res = await addLvBuilding({
        name: newBuildName.value,
      });

      if (res.data.state === 1) {
        lvbuildingList.value.push({
          name: newBuildName.value,
          rooms: [],
        });
        newBuildName.value = "";
        ElMessage.success("添加成功");
        dialogVisible.value = false;
      }
    };
    const addRoom = async (building) => {
      const res = await addLvRoom({
        name: newRoomName.value,
        max: +max.value,
        building,
      });

      if (res.data.state === 1) {
        lvbuildingList.value.forEach((b) => {
          if (b.name === building) {
            b.rooms.push({
              name: newRoomName.value,
              max: +max.value,
              building,
            });
          }
        });
        newRoomName.value = "";
        (max.value = ""), ElMessage.success("添加成功");
        dialogVisible2.value = false;
      }
    };

    const activeRoom = ref({});
    const openRoomConfig = (r) => {
      activeRoom.value = r;
      dialogVisible3.value = true;
    }
    const usernumber = ref("");
    const addToRoom = async () => {
      if (activeRoom.value.including >= activeRoom.value.max) {
        ElMessage.error("房间已满，添加失败");
        return;
      }

      const res = await addStudent({
        usernumber: usernumber.value,
        livingroom: activeRoom.value.name
      });

      if (res.data.state === 1) {
        usernumber.value = "";
        ElMessage.success("添加成功");
        dialogVisible3.value = false;
        getLvbuildingList(lvbuildingList);
      }
    };

    return {
      activeNames,
      dialogVisible,
      dialogVisible2,
      dialogVisible3,
      newBuildName,
      newRoomName,
      addBuild,
      addRoom,
      lvbuildingList,
      activeRoom,
      openRoomConfig,
      addToRoom,
      max,
      usernumber
    };
  },
};
</script>
<style lang="scss">
.page-livingroom {
  padding: 20px;

  .user-live {
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

  .opers-bar {
    text-align: right;
    margin: 20px;
  }

  .addroom-icon {
    cursor: pointer;
  }

  .collapse-title {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .room-list {
    display: flex;
    flex-wrap: wrap;

    .room-item {
      margin: 10px;
      padding: 10px;
      cursor: pointer;

      &:hover {
        background-color: #00958654;
      }

      img {
        width: 40px;
        height: 40px;
      }
      p {
        text-align: center;
      }
    }
  }
}
</style>
