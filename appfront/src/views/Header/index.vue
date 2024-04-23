<template>
  <div class="header">
    <span class="name" style="color: rgb(75,82,90); font-weight: bold;">{{ routeName }}</span>
    <div class="right-header">
      <div class="handbook" style="flex: 2">
        <svg t="1713787743214" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1538" width="30" height="30"><path d="M767.3 900H257.4c-49.6 0-90-40.4-90-90V212c0-49.6 40.4-90 90-90h509.8c49.6 0 90 40.4 90 90v598c0.1 49.6-40.3 90-89.9 90zM257.4 182c-16.5 0-30 13.5-30 30v598c0 16.5 13.5 30 30 30h509.8c16.5 0 30-13.5 30-30V212c0-16.5-13.5-30-30-30H257.4z" fill="#666666" p-id="1539"></path><path d="M334.7 518.5c-15.2 0-27.5-12.3-27.5-27.5V186.2c0-15.2 12.3-27.5 27.5-27.5s27.5 12.3 27.5 27.5V491c0 15.2-12.3 27.5-27.5 27.5zM520.6 518.5c-15.2 0-27.5-12.3-27.5-27.5V186.2c0-15.2 12.3-27.5 27.5-27.5s27.5 12.3 27.5 27.5V491c0 15.2-12.3 27.5-27.5 27.5z" fill="#666666" p-id="1540"></path><path d="M519.5 518c-7 0-14.1-2.7-19.4-8.1l-89.6-89.6c-10.7-10.7-10.7-28.2 0-38.9s28.2-10.7 38.9 0L539 471c10.7 10.7 10.7 28.2 0 38.9-5.4 5.5-12.5 8.1-19.5 8.1z" fill="#666666" p-id="1541"></path><path d="M336.7 518.8c-7.2 0-14.4-2.8-19.7-8.4-10.6-10.9-10.3-28.3 0.6-38.9l89.1-86.4c10.9-10.6 28.3-10.3 38.9 0.6 10.6 10.9 10.3 28.3-0.6 38.9L355.8 511c-5.3 5.2-12.2 7.8-19.1 7.8z" fill="#666666" p-id="1542"></path></svg>
        <span style="color: rgb(116,117,146);">手册</span>
      </div>
      <div class="guide" style="flex: 2">
        <svg t="1713788777210" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3561" width="30" height="30"><path d="M829.1 195.7c84.2 84.2 127.7 189.9 130.8 317.1-3.1 127.2-46.6 232.9-130.8 317.1S639.2 957.6 512 960.7c-127.2-3.1-232.9-46.6-317.1-130.8C110.6 745.7 66.7 640 64 512.8c2.7-127.2 46.6-232.9 130.8-317.1C279 111.5 384.8 68 512 64.9c127.2 3.1 232.9 46.6 317.1 130.8z m-45.2 589c72.1-72.1 109.7-163 112.9-271.9C893.6 404 856 313 783.9 240.9 711.7 168.8 620.8 131.2 512 128c-109.3 3.1-199.8 40.8-271.9 112.9C167.5 313 129.9 404 127.2 512.8c2.7 109.3 40.3 199.8 112.9 271.9 72.1 72.1 163 109.7 271.9 112.9 108.8-2.7 199.7-40.3 271.9-112.9z m-74.4-469.4L624 504.7c1.3 15.7-0.9 31.4-6.7 46.6-5.4 15.2-14.3 28.7-26.4 40.8-12.1 12.1-25.5 20.6-40.8 26.4-15.2 5.4-30.5 7.6-46.6 6.7l-189.9 85.6L400 520.9c-1.3-15.7 0.9-31.4 6.7-46.6 5.4-15.2 14.3-28.7 26.4-40.8 12.1-12.1 25.5-20.6 40.8-26.4 15.2-5.4 30.5-7.6 46.6-6.7l189-85.1zM560.8 512.8c0-13-4.9-24.2-14.8-34-9.9-9.9-21.5-14.8-34-14.8-13 0-24.2 4.9-34 14.8-9.9 9.9-14.8 21.5-14.8 34 0 13 4.9 24.2 14.8 34 9.9 9.9 21.5 14.8 34 14.8 13 0 24.6-4.5 34.9-13.9 9.4-10.3 13.9-21.9 13.9-34.9z m0 0" p-id="3562" fill="#666666"></path></svg>
        <span style="color: rgb(116,117,146);">引导</span>
      </div>
      <el-dropdown trigger="click" popper-class="popper-class" @command=handleCommand>
        <div class="avatar"  @click="popPanel">
          <img :src="imgUrl">
          <span class="username" style="margin-left:5px;">admin</span>
          <el-icon><ArrowDown /></el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup>
import imgUrl from './avator.jpg';
import { ArrowDown } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
const router = useRouter();
defineOptions({
  name: 'Header',
});
const props = defineProps({
  routeName: {
    type: String,
    required: true,
  },
});
const handleCommand = () => {
  router.push({ path: '/' })
};
</script>

<style scoped>
.header {
  height: 100%;
  display: flex;
  align-items: center;
}
.name {
  flex: 3;
}
.right-header {
  flex: 1;
  display: flex;
  align-items: center;
}
.right-header > * { 
  display: flex;
  align-items: center;
}
img {
  width: 35px;
  height: 35px;
}
.username {
  display: inline-block;
  width: 50px;
  overflow:hidden;
  text-overflow:ellipsis;
}
.avatar {
  position: relative;
  display: flex;
  align-items: center;
}
.avatar-panel {
  position: absolute;
  left: 0;
  top: 200%;
  height: 40px;
  width: 40px;
  background-color: white;
  z-index: 1000;
}
</style>