<template>
  <div class="basic">
    <ManagerHeader></ManagerHeader>
    <el-collapse accordion>
    </el-collapse>
  </div>
</template>

<script setup>
import ManagerHeader from './ManagerHeader/index.vue';
import { getLayers } from '@/api/api';
defineOptions({
  name: 'BasicManager',
});
getLayers().then(result => console.log(result.data));
</script>

<style scoped>
.basic {
  margin: 10px;
  height: 100%;
}
:deep(.el-collapse-item__header) {
  height: 100px;
}
</style>