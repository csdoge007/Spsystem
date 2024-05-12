<template>
  <el-row class="tac">
    <el-col>
      <h1 class="name">商选易达</h1>
      <el-menu
        background-color="#242E42"
        class="el-menu-vertical-demo"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        :default-active="activeMenuItem"
        unique-opened
      >
        <el-menu-item index="Edit" @click="toEdit">
          <template #title>
            <el-icon><Edit /></el-icon>
            <span>企业制图</span>
            <svg v-if="!isAdmin" t="1715523890611" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4259" width="28" height="28"><path d="M256 426.666667h512v426.666666H256V426.666667z m85.333333 85.333333v256h341.333334v-256H341.333333z m0-42.666667H256v-42.666666h85.333333V341.333333c0-93.866667 76.8-170.666667 170.666667-170.666666s170.666667 76.8 170.666667 170.666666v85.333334h85.333333v42.666666h-170.666667V341.333333c0-46.933333-38.4-85.333333-85.333333-85.333333s-85.333333 38.4-85.333333 85.333333v128H341.333333z m170.666667 213.333334c-25.6 0-42.666667-17.066667-42.666667-42.666667s17.066667-42.666667 42.666667-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666667z" fill="#eeeeee" p-id="4260"></path></svg>

          </template>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><location /></el-icon>
            <span>智能选址</span>
          </template>
          <el-menu-item index="datamanager" @click="goTo('datamanager')">数据管理</el-menu-item>
          <el-menu-item index="Select" @click="goTo('Select')">选址规划</el-menu-item>
          <!-- <el-menu-item index="2-3">我的收藏</el-menu-item> -->
        </el-sub-menu>
        <!-- <el-sub-menu index="3">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>基础管理</span>
          </template> -->
          <el-menu-item index="userInfo" @click="goTo('userInfo')">
            <template #title>
              <el-icon><Setting /></el-icon>
              <span>基础信息</span>
            </template> 
          </el-menu-item>
          <!-- <el-menu-item index="userManager" @click="toManager">
            账户管理
            <svg v-if="!isAdmin" t="1715523890611" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4259" width="28" height="28"><path d="M256 426.666667h512v426.666666H256V426.666667z m85.333333 85.333333v256h341.333334v-256H341.333333z m0-42.666667H256v-42.666666h85.333333V341.333333c0-93.866667 76.8-170.666667 170.666667-170.666666s170.666667 76.8 170.666667 170.666666v85.333334h85.333333v42.666666h-170.666667V341.333333c0-46.933333-38.4-85.333333-85.333333-85.333333s-85.333333 38.4-85.333333 85.333333v128H341.333333z m170.666667 213.333334c-25.6 0-42.666667-17.066667-42.666667-42.666667s17.066667-42.666667 42.666667-42.666667 42.666667 17.066667 42.666667 42.666667-17.066667 42.666667-42.666667 42.666667z" fill="#eeeeee" p-id="4260"></path></svg>
          </el-menu-item> -->
        <!-- </el-sub-menu> -->
      </el-menu>
    </el-col>
  </el-row>
</template>

<script setup>
import {
  Location,
  Edit,
  Setting
} from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useMenuStore } from '@/stores/menu';
import { useLoginStore } from '@/stores/user';
const loginStore = useLoginStore();
const { isAdmin } = storeToRefs(loginStore);
const menuStore = useMenuStore();
const { activeMenuItem } = storeToRefs(menuStore);
const router = useRouter();
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}
const toEdit = () => {
  if (!isAdmin.value) {
    return;
  } else {
    goTo('Edit');
  }
};
const goTo = (name) => {
  router.push({
    name,
    params: {
      id: router.currentRoute.value.params.id,
    }
  });
};
// watch(active, (newValue) => {
//   router.push({
//     name: 'select',
//     params: {
//       id: router.currentRoute.value.params.id,
//     }
//   });
// }, { immediate: true })
</script>
<style scoped>
.name {
  display: flex;
  color:#fff;
  font-size: 1.5em;
  justify-content: center;
}
.icon {
  position: absolute;
  right: 10px;
}
</style>