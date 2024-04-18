<template>
  <div class="header">
    <el-input placeholder="搜图层要素" class="input-class" :prefix-icon="Search">
    </el-input>
    <div class="tools">
      <el-tooltip class="tools-group" :visible="false">
        <i class="group-icon" @mouseover="handleMouseOver" @mouseout= "handleMouseOut">
          <svg t="1712575940389" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4288" width="15" height="15"><path d="M524.1 626h175.3c5.5 0 10-4.5 10-10s-4.5-10-10-10H520.3l-29.2-153.4c-1-5.4-6.3-9-11.7-8-5.4 1-9 6.3-8 11.7L499.9 606H324.6c-5.5 0-10 4.5-10 10s4.5 10 10 10h179.1l29.2 153.4c0.9 4.8 5.1 8.1 9.8 8.1 0.6 0 1.2-0.1 1.9-0.2 5.4-1 9-6.3 8-11.7L524.1 626zM373.1 416.1c0-2.8-2.2-5-5-5H194.4c-18.5 0-33.5 15-33.5 33.5 0 0.3 0 0.6 0.1 0.9l30.8 166.2c0.4 2.4 2.5 4.1 4.9 4.1 0.3 0 0.6 0 0.9-0.1 2.7-0.5 4.5-3.1 4-5.8l-30.7-165.7c0.2-12.8 10.7-23.1 23.5-23.1h173.7c2.7 0 5-2.2 5-5zM845.3 787.8c-0.2 12.8-10.7 23.1-23.5 23.1H648.1c-2.8 0-5 2.2-5 5s2.2 5 5 5h173.7c18.5 0 33.5-15 33.5-33.5 0-0.3 0-0.6-0.1-0.9l-30.8-166.2c-0.5-2.7-3.1-4.5-5.8-4-2.7 0.5-4.5 3.1-4 5.8l30.7 165.7z" fill="" p-id="4289"></path><path d="M891.7 266c-9.3-11.5-22.2-26-38.3-43.2-27.2-29-54.8-56.2-55.1-56.5-2.8-2.8-6.6-4.3-10.5-4.3H639.1c-2.3 0-4.6 0.5-6.7 1.6l-181.7 90.9H214.2c-26.7 0-48.4 21.7-48.4 48.4V370h-10.5c-24 0-43.5 19.5-43.5 43.5 0 0.9 0.1 1.9 0.3 2.8L189 820.1c0.8 23.3 20 41.9 43.5 41.9h636.1c15.6 0 29.2-8.2 36.9-20.5 4-2.7 6.6-7.2 6.6-12.4V302.8c0-7.1-3.4-15.8-20.4-36.8z m-695.8 36.8c0-10.1 8.2-18.4 18.4-18.4h240c2.3 0 4.6-0.5 6.7-1.6L642.7 192h139c8.3 8.3 27.3 27.3 46.6 47.9 44 46.7 52.3 61 53.8 64.4v355.1L835 411.9c-0.8-23.3-20-41.9-43.5-41.9H195.9v-67.2zM868.6 832H232.5c-7.4 0-13.5-6.1-13.5-13.5 0-0.9-0.1-1.9-0.3-2.8L142 412.3c0.6-6.9 6.4-12.3 13.4-12.3h636.1c7.4 0 13.5 6.1 13.5 13.5 0 0.9 0.1 1.9 0.3 2.8L882 819.7c-0.6 6.9-6.4 12.3-13.4 12.3z" fill="" p-id="4290"></path><path d="M825.5 261.8c2-1.9 2.1-5.1 0.1-7.1l-44.3-46.1c-0.9-1-2.2-1.5-3.6-1.5h-133c-0.8 0-1.5 0.2-2.2 0.5L539.7 259c-2.5 1.2-3.5 4.2-2.2 6.7 0.9 1.8 2.6 2.8 4.5 2.8 0.8 0 1.5-0.2 2.2-0.5l101.7-50.9h129.8l42.8 44.6c1.9 1.9 5 2 7 0.1z" fill="" p-id="4291"></path></svg>
          <span @click="handleGroupClick">新建分组</span>
        </i>
      </el-tooltip>   
      <el-tooltip class="tools-layer" :visible="false">
        <i class="layer-icon" @mouseover="handleMouseOver" @mouseout= "handleMouseOut">
          <svg t="1712576345059" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5305" width="15" height="15"><path d="M949.333333 512a32 32 0 0 0-18.346666-29.013333L811.946667 426.666667l119.04-56.32c11.306667-5.333333 18.346667-16.64 18.346666-29.013334a32 32 0 0 0-18.346666-29.013333l-405.333334-192c-8.746667-4.053333-18.56-4.053333-27.306666 0l-405.333334 192A32 32 0 0 0 74.666667 341.333333c0 12.373333 7.04 23.68 18.346666 29.013334L212.053333 426.666667l-119.04 56.32A32 32 0 0 0 74.666667 512c0 12.373333 7.04 23.68 18.346666 29.013333L212.053333 597.333333l-119.04 56.32A32 32 0 0 0 74.666667 682.666667c0 12.373333 7.04 23.68 18.346666 29.013333l405.333334 192c4.266667 1.92 8.96 2.986667 13.653333 2.986667s9.386667-1.066667 13.653333-2.986667l405.333334-192c11.306667-5.333333 18.346667-16.64 18.346666-29.013333a32 32 0 0 0-18.346666-29.013334L811.946667 597.333333l119.04-56.32c11.306667-5.333333 18.346667-16.64 18.346666-29.013333z m-768-170.666667L512 184.746667 842.666667 341.333333l-118.186667 55.893334-1.28 0.64-211.2 100.053333-211.2-100.053333-1.28-0.64L181.333333 341.333333z m661.333334 341.333334L512 839.253333 181.333333 682.666667l105.6-49.92 211.413334 100.266666c4.266667 1.92 8.96 2.986667 13.653333 2.986667s9.386667-1.066667 13.653333-2.986667l211.413334-100.266666L842.666667 682.666667z m-118.613334-114.56L512 668.586667l-212.053333-100.48L181.546667 512l105.386666-49.92 211.413334 100.266667c4.266667 1.92 8.96 2.986667 13.653333 2.986666s9.386667-1.066667 13.653333-2.986666l211.413334-100.266667L842.453333 512l-118.4 56.106667z" p-id="5306"></path></svg>
          <span @click="handleLayerClick">新建图层</span>
        </i>
      </el-tooltip>
    </div>
  </div>
</template>

<script setup>
import { Search } from '@element-plus/icons-vue';
import { useDialogStore } from '@/stores/dialog.js';
defineOptions({
  name: 'ManagerHeader',
})
const dialogStore = useDialogStore();
const { openLayerDialog } = dialogStore;
const handleMouseOver = (event) => {
  event.currentTarget.querySelector('span')?.classList.add('highlighted');
  event.currentTarget.querySelector('svg')?.classList.add('blue');
  console.log('hh');
};
const handleMouseOut = (event) => {
  event.currentTarget.querySelector('span')?.classList.remove('highlighted');
  event.currentTarget.querySelector('svg')?.classList.remove('blue');
}
const handleLayerClick = () => {
  openLayerDialog();
  console.log('success');
}
</script>

<style scoped>
.header {
  position: relative;
  height: 50px;
  display: flex;
  align-items: center;
}
.el-input {
  width: 40%;
  height: 30px;
  flex: 3;
}
:deep(.el-input__wrapper) {
  border-radius: 15px;
  background-color: rgb(240,240,240);
}
.tools {
  flex: 4;
  margin-left: 35px;
  display: flex;
  justify-content: space-between;
}
.highlighted {
  color: blue;
  cursor: pointer;
}
span {
  font-size: 15px;
  color: rgb(111,114,122);
  font-style: normal; 
}
.icon.blue {
  fill: blue; /* 设置SVG图标的颜色为蓝色 */
}
</style>