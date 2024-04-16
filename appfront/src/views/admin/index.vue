<template>
  <el-container>
    <el-aside>
      <Navigator></Navigator>
    </el-aside>

    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view v-slot="{ Component }"> 
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
  <LayerInfo v-if="layerDialog"></LayerInfo>
</template>

<script setup>
import Navigator from '@/components/Navigator.vue';
import LayerInfo from '@/components/EditPanel/BasicManager/ManagerHeader/CreateLayerInfo/index.vue';
import { storeToRefs } from 'pinia';
import { useDialogStore } from '@/stores/dialog.js';
const dialogStore = useDialogStore();
const { layerDialog } = storeToRefs(dialogStore);
defineOptions({
  name: 'Admin'
});
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: #242E42;
  width: 200px;
}
.el-main {
  padding: 0;
}
</style>