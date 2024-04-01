<template>
  <div class="popup">
    {{ name }}
    <div class="close" @click="close">X</div>
  </div>
</template>

<script setup>
defineOptions({
  name: 'Popup'
});
const emit = defineEmits(['close']);
const props = defineProps({
  name: String,
})
const close = () => {
  emit('close');
}
</script>

<style scoped>
.popup {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, calc(-100% - 20px));
  z-index: 1000;
  background-color: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.popup::before {
  content: '';
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color:white;
  position: absolute;
  left: 50%;
  top: 99%;
  transform: translate(-50%);
}
.close {
  position: absolute;
  top: 3px;
  right: 3px;
  cursor: pointer;
  color: #666;
  font-size: 1px;
}
</style>