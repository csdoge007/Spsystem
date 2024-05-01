<template>
  <ul class="rate-panel">
    <li><span>居民区：{{ resident }}分</span></li>
    <li><span>竞争者：{{ competitor }}分</span></li>
    <li><span>交通：{{ traffic }}分</span></li>
    <li><span>租金：{{ rent }}分</span></li>
  </ul>
</template>

<script setup>
defineOptions({
  name: 'RatePanel',
});
const props = defineProps({
  resident: {
    type: Number,
    required: true,
  },
  competitor: {
    type: Number,
    required: true,
  },
  traffic: {
    type: Number,
    required: true,
  },
  rent: {
    type: Number,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.rate-panel {
  list-style-type: none; 
  font-size: 11px;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: space-between; 
  // margin-left: -10px;
  padding-left:0;
  position: relative;
  top: 50px;
  height: 150px;
}
</style>