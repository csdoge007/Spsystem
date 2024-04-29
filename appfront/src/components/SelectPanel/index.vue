<template>
  <div class="collapse">
    <h1>选址评估结果如下</h1>
    <el-collapse accordion @change="changeActiveItem" v-model="activeItem">
      <el-collapse-item v-for="(point, idx) in selectStore.selectedPoints" :key="idx" :name="idx">
        <template #title>
          <PanelItem 
            :rank="idx + 1" 
            :name="point.name"
            :accessibility="point.resultSums"
            :category="point.category">
          </PanelItem>
        </template>
        <component 
          :is="activeItem === idx ? RadarChart : ''"
          :name="point.name"
        >
        </component>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { useSelectStore } from '@/stores/select';
import PanelItem from '@/components/PanelItem/index.vue';
import RadarChart from '@/components/RadarChart/index.vue';
import { ref } from 'vue';
defineOptions({
  name: 'SelectPanel',
})
const selectStore = useSelectStore();
const activeItem = ref('');
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
  height: 600px; 
  overflow-y: auto; 
}
:deep(.el-collapse-item__content) {
  padding-bottom: 0;
} 
</style>
