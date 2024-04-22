<template>
  <div class="point-items">
    <div class="point-item" v-for="element in elements" :key="element.name">
      {{element.title}}
    </div>
  </div>
</template>
 
<script setup>
defineOptions({
  name: 'EditItemContent',
});
const props = defineProps({
  elements: {
    type: Array,
    required: true,
  },
});
console.log(props.elements);
</script>

<style scoped>
.point-items {
  display: flex;
  flex-direction: column;
}
.point-item {
  height: 35px;
}
</style>