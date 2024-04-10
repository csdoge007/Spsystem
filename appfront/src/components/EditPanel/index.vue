<template>
  <div class="collapse">
    <el-tabs v-model="activeName" class="demo-tabs">
      <el-tab-pane label="基础管理" name="manager">
        <BasicManager></BasicManager>
      </el-tab-pane>
      <el-tab-pane label="高级分析" name="analysis">
        <Analysis></Analysis>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import BasicManager from './BasicManager/index.vue';
import Analysis from './Analysis/index.vue';
defineOptions({
  name: 'EditPanel',
})
const activeName = ref('manager');

</script>

<style scoped>
</style>
