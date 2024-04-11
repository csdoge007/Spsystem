<template>
  <div class="select">
    <LeftSlide class="leftslide" :hideLeft="isHidden" @toggleRotation="toggleRotation">
      <SelectPanel></SelectPanel>
    </LeftSlide>
    <div class="map-form">
        <Map :isEdit="false"></Map>
      <SelectForm :layers="layers" @toLeft="toLeft" :class="{ left: !isHidden }"></SelectForm>
    </div>
  </div>
</template>

<script setup>
import Map from '@/components/Map/index.vue';
import LeftSlide from '@/components/LeftSlide.vue';
import SelectForm from '@/components/SelectForm/index.vue';
import SelectPanel from '@/components/SelectPanel/index.vue';
import { ref } from 'vue';
defineOptions({
  name: 'Select'
})
const layers = ref([
      { label: '图层0', value: 'layer0' },
    ]);
const isHidden = ref(true);
const toggleRotation = () => {
  isHidden.value = !isHidden.value;
};
const toLeft = () => {
  isHidden.value = false;
}
</script>
<style scoped>
.select {
  position: relative;
  display: flex;
  height: 100%;
  margin: 0;
}
.map-form {
  position: relative;
  height: 100%;
  width:100%;
}
.left {
  position: absolute;
  left: 40px;
  transform: translate(0,-50%);
}
</style>