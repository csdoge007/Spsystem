<template>
  <div class="edit-item">
    {{ name }} ({{ quantity }})
  </div>
</template>

<script setup>
defineOptions({
  name: 'EditItemHeader',
});
const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  children: {
    type: String,
    required: true,
  },
});
</script>

<style scoped>
.edit-item {
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  border-bottom: 1px solid #ccc;
}
</style>