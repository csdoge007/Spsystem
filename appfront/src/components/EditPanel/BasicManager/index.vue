<template>
  <div class="basic">
    <ManagerHeader></ManagerHeader>
    <el-scrollbar height="570px">
      <!-- <el-tree
        style="max-width: 600px"
        :data="data"
      >
        <template #default="{ data }">
          <el-collapse accordion @change="toggleItem" v-if="data.id===2" class="tree-collapse">
            <el-collapse-item v-for="layer in layers" :key="layer.name" :name="layer.name">
              <div class="triangle"></div>
              <template #title>
                <EditItemHeader v-bind="layer" :isActived="activeName === layer.name"></EditItemHeader>
              </template>
              <EditItemContent :elements="layer.children ? layer.children : []"></EditItemContent>
            </el-collapse-item>
          </el-collapse>
        </template>
      </el-tree> -->
      <el-collapse accordion @change="toggleItem">
        <el-collapse-item v-for="layer in layers" :key="layer.name" :name="layer.name">
          <div class="triangle"></div>
          <template #title>
            <EditItemHeader v-bind="layer" :isActived="activeName === layer.name"></EditItemHeader>
          </template>
          <EditItemContent :elements="layer.children ? layer.children : []"></EditItemContent>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </div>
</template>

<script setup>
import ManagerHeader from './ManagerHeader/index.vue';
import EditItemHeader from './EditItem/EditItemHeader/index.vue';
import EditItemContent from './EditItem/EditItemContent/index.vue';
import { useLayerStore } from '@/stores/layer';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
defineOptions({
  name: 'BasicManager',
});
const layerStore = useLayerStore();
const { layers } = storeToRefs(layerStore);
const activeName = ref(-1);
const toggleItem = (name) => {
  activeName.value = name;
}
const data = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 2,
        label: 'Level two 1-1',
      },
    ],
  },
]

</script>

<style scoped>
.basic {
  margin: 10px;
  height: 100%;
}
:deep(.el-tree-node__content) {
  height: auto;
  padding-left: 0 !important;
}
/* :deep(.el-tree-node.is-current) { */
  /* background-color: blue; */
/* } */
.el-collapse {
  border-top-width: 0;
  width: 100%;
}
:deep(.el-collapse-item__header) {
  height: 60px;
  border-bottom: 0px;
}
.tree-collapse {
  margin-left: -23px;
}
/*.el-collapse {
  height: 600px; 
  overflow-y: auto; 
}*/
.el-collapse-item {
  position: relative;
}
.el-collapse-item.is-active {
  border: 0.5px solid #03d3fc;
}
:deep(.el-collapse-item__wrap) {
  border-bottom-width: 0;
}
:deep(.el-collapse-item__header.is-active) {
  background-color: rgba(242,245,255,0.6);
  color: rgb(91,125,219);
}
:deep(.el-collapse-item__content) {
  padding-bottom: 0;
  margin-left: 10px;
  margin-top: 10px;
  color: rgb(115,127,155);
  font-size: 15px;
}
:deep(.el-collapse-item__content)::after {
  content: '';
  position: relative;
  left: 50%; 
  bottom: 5px; 
  transform: translate(-50%, -50%);
  width: 0;
  height: 0;
  border: transparent;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 5px solid blue;
}
</style>