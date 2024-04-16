<template>
  <div class="basic">
    <ManagerHeader></ManagerHeader>
      <el-collapse accordion>
        <el-collapse-item v-for="(value, idx) in layers" :key="idx" :name="idx">
          <template #title>
            <EditItemHeader v-bind="value"></EditItemHeader>
          </template>
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
  height: 100px;
}
.el-collapse {
  height: 600px; 
  overflow-y: auto; 
}
</style>