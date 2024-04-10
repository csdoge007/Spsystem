<template>
  <div class="collapse">
    <h1>选址评估结果如下</h1>
    <el-collapse accordion @change="changeActiveItem">
      <el-collapse-item v-for="(point, idx) in selectStore.selectedPoints" :key="idx" :name="idx">
        <template #title>
          <PanelItem 
            :rank="idx + 1" 
            :name="point.name"
            :accessibility="point.resultSums"
            :category="point.category">
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
.el-collapse {
  height: 600px; /* 设置最大高度，以便内容超出时出现滚动条 */
  overflow-y: auto; 
}
</style>
