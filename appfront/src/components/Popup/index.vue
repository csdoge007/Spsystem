<template>
  <div class="popup">
    <div class="content">
      <h3>点位信息</h3>
    <p>点位名称：{{ name }}</p>

    <p>经度： {{ x }}</p>
    <p>纬度： {{ y }}</p>
    </div>
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
  x: Number,
  y: Number,
})
const close = () => {
  emit('close');
}
</script>

<style scoped>
.content {
  display: flex;
  flex-direction: column;
}
.popup {
  display: flex;
  /* flex-direction: column; */
  /* justify-content: center; */
  /* align-items: center; */
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, calc(-100% - 35px));
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
  top: 98%;
  transform: translate(-50%);
}
.close {
  position: absolute;
  top: 3px;
  right: 3px;
  cursor: pointer;
  color: #666;
  font-size: 10px;
}
</style>