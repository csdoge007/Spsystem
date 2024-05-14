<template>
  <div class="collapse" ref="collapseContent">
    <h1 ref="title">选址评估结果如下</h1>
    <el-scrollbar :height="scrollHeight">
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
              :is="RadarChart"
              v-if="activeItem === idx"
              :name="point.name"
              :radius="point.radius"
              :category="point.category"
            >
            </component>
        </el-collapse-item>
      </el-collapse>
    </el-scrollbar>
  </div>
</template>

<script setup>
import { useSelectStore } from '@/stores/select';
import PanelItem from '@/components/PanelItem/index.vue';
import RadarChart from '@/components/RadarChart/index.vue';
import { onMounted, ref } from 'vue';
defineOptions({
  name: 'SelectPanel',
})
const collapseContent = ref(null);
const selectStore = useSelectStore();
const activeItem = ref('');
const title = ref(null);
const scrollHeight = ref('');
const changeActiveItem = (activeItemIndex) => {
  if (!activeItemIndex && activeItemIndex !== 0) return;
  selectStore.panToActivePoint(activeItemIndex);
};
onMounted(() => {
  scrollHeight.value = `${collapseContent.value.clientHeight - title.value.clientHeight}px`;
});
</script>

<style scoped>
:deep(.el-collapse-item__header) {
  height: 100px;
  margin-bottom: 0;
}
:deep(.el-collapse-item__content) {
  padding-bottom: 0;
} 
.collapse {
  height: 100%;
}
h1 {
  height: 40px;
  margin: 0;
  display: flex;
  align-items: center;
  margin-left: 10px;
}
</style>
