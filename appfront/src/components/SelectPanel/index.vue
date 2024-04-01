<template>
  <div class="collapse">
    <h1>选址评估结果如下</h1>
    <el-collapse accordion @change="changeActiveItem">
      <el-collapse-item v-for="(point, idx) in selectStore.selectedPoints" :key="idx" :name="idx">
        <template #title>
          <PanelItem 
            :rank="idx + 1" 
            :name="point.name"
            :accessibility="point.resultSums">
          </PanelItem>
        </template>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { useSelectStore } from '@/stores/select';
import PanelItem from '@/components/PanelItem/index.vue';
defineOptions({
  name: 'SelectPanel',
})
const selectStore = useSelectStore();
const changeActiveItem = (activeItemIndex) => {
  if (!activeItemIndex && activeItemIndex !== 0) return;
  selectStore.panToActivePoint(activeItemIndex);
}
</script>

<style scoped>
:deep(.el-collapse-item__header) {
    height: 100px;
}
.collapse {
  height: 1000px;
  overflow: auto;
}
</style>
