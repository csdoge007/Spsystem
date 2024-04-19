<template>
  <div class="basic">
    <ManagerHeader></ManagerHeader>
      <el-collapse accordion @change="toggleItem">
        <el-collapse-item v-for="(value, idx) in layers" :key="value.name" :name="idx">
          <div class="triangle"></div>
          <template #title>
              <EditItemHeader v-bind="value"></EditItemHeader>
          </template>
          Hello
        </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script setup>
import ManagerHeader from './ManagerHeader/index.vue';
import EditItemHeader from './EditItem/EditItemHeader/index.vue';
import { onMounted } from 'vue';
import { useLayerStore } from '@/stores/layer';
import { storeToRefs } from 'pinia';
defineOptions({
  name: 'BasicManager',
});
const layerStore = useLayerStore();
const { layers } = storeToRefs(layerStore);
const { fetchLayers } = layerStore;
onMounted(async () => {
  await fetchLayers();
});
</script>

<style scoped>
.basic {
  margin: 10px;
  height: 100%;
}
:deep(.el-collapse-item__header) {
  height: 60px;
  border-bottom: 0px;
}
.el-collapse {
  height: 600px; 
  overflow-y: auto; 
}
.el-collapse-item {
  position: relative;
}
.el-collapse-item.is-active {
  border: 0.5px solid #03d3fc;
}
:deep(.el-collapse-item__wrap) {
  border-bottom-width: 0;
}
.el-collapse-item.is-active::after{
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
:deep(.el-collapse-item__header.is-active) {
  background-color: rgba(242,245,255,0.6);
  color: rgb(91,125,219);
}
</style>