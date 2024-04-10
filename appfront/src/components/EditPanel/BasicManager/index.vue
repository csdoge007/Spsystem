<template>
  <div class="basic">
    <ManagerHeader></ManagerHeader>
      <el-collapse accordion>
        <el-collapse-item v-for="(value, idx) in layersData" :key="idx" :name="idx">
          <template #title>
            <EditItemHeader v-bind="value"></EditItemHeader>
          </template>
        </el-collapse-item>
      </el-collapse>
  </div>
</template>

<script setup>
import ManagerHeader from './ManagerHeader/index.vue';
import { getLayers } from '@/api/api';
import EditItemHeader from './EditItem/EditItemHeader/index.vue';
import { onMounted, ref } from 'vue';
defineOptions({
  name: 'BasicManager',
});
let layersData = ref([]);
onMounted(async () => {
  layersData.value = await getLayers().then(res => res.data);
})
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