<template>
  <div class="point-items">
    <div class="point-item" v-for="point in points" :key="point.name">
      {{point.name}}
    </div>
  </div>
</template>
 
<script setup>
defineOptions({
  name: 'EditItemContent',
});
const props = defineProps({
  points: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.point-items {
  height: 100%;
}
.point-item {
  height: 20px;
}
</style>