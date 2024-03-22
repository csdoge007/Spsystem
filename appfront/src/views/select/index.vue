<template>
  <div class="select">
    <LeftSlide class="leftslide" :hideLeft="isHidden" @toggleRotation="toggleRotation"></LeftSlide>
    <Map></Map>
  </div>
</template>

<script setup>
import Map from '@/components/Map.vue';
import LeftSlide from '@/components/LeftSlide.vue';
import { ref } from 'vue';
const isHidden = ref(true);
const toggleRotation = () => {
  isHidden.value = !isHidden.value;
};

</script>

<style scoped>
.select {
  position: relative;
  display: flex;
  height: 100%;
  margin: 0;
}

</style>