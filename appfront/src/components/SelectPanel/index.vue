<template>
  <div class="collapse">
    <h1>选址评估结果如下</h1>
    <el-collapse>
      <!-- <el-collapse-item title="Consistency" name="1">
        <template #title>
          <div>
            <h1>1</h1>
          </div>
        </template>
      </el-collapse-item> -->

      <el-collapse-item v-for="(point, idx) in selectStore.selectedPoints" :key="idx" :name="point.name">
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

</script>

<style scoped>
::v-deep .el-collapse-item__header {
    height: 100px;
}
.collapse {
  height: 1000px;
  overflow: auto;
}
</style>