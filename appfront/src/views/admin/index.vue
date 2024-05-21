<template>
  <el-container>
    <el-aside>
      <Navigator></Navigator>
    </el-aside>

    <el-container>
      <el-header :class="{isline: routeName === '选址规划'}">
        <Header :routeName="routeName"></Header>
      </el-header>
      <el-main>
        <router-view v-slot="{ Component, route }"> 
          <keep-alive v-if="route.meta.alias !== '数据管理'">
            <component :is="Component" />
          </keep-alive>
          <component :is="Component" v-else />
        </router-view>
      </el-main>
    </el-container>
  </el-container>
  <LayerInfo v-if="layerDialog"></LayerInfo>
  <ReNameInfo :layerId="reNameId"></ReNameInfo>
  <DataUpdate v-if="updateDialog"></DataUpdate>
  <Upload v-if="uploadDialog"></Upload>
</template>

<script setup>
import DataUpdate from '@/views/DataManager/DataUpdate/index.vue';
import Upload from '@/components/Upload/index.vue';
import Navigator from '@/components/Navigator.vue';
import LayerInfo from '@/components/EditPanel/BasicManager/ManagerHeader/CreateLayerInfo/index.vue';
import ReNameInfo from '@/components/EditPanel/BasicManager/EditItem/EditItemHeader/ReNameInfo/index.vue';
import { storeToRefs } from 'pinia';
import { useDialogStore } from '@/stores/dialog.js';
import { useRoute } from 'vue-router'
import { ref, watch } from 'vue';
import Header from '../Header/index.vue';
const dialogStore = useDialogStore();
const { reNameId, layerDialog, updateDialog, uploadDialog } = storeToRefs(dialogStore);
defineOptions({
  name: 'Admin'
});
const route = useRoute();
const routeName = ref(route.meta.alias);
watch(() => route.meta.alias,(newName) => {
  routeName.value = newName;
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
.isline {
  border-bottom: 1px solid lightgrey;
}
</style>