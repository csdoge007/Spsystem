<template>
  <div class="select">
    <LeftSlide class="leftslide" :hideLeft="isHidden" @toggleRotation="toggleRotation">
      <SelectPanel></SelectPanel>
    </LeftSlide>
    <div class="map-form">
        <Map :isEdit="false"></Map>
      <SelectForm :layers="pointLayers" @toLeft="toLeft" :class="{ left: !isHidden }"></SelectForm>
    </div>
  </div>
</template>

<script setup>
import Map from '@/components/Map/index.vue';
import LeftSlide from '@/components/LeftSlide.vue';
import SelectForm from '@/components/SelectForm/index.vue';
import SelectPanel from '@/components/SelectPanel/index.vue';
import { computed, onMounted, ref } from 'vue';
import { useLayerStore } from '@/stores/layer';
import { storeToRefs } from 'pinia';
defineOptions({
  name: 'Select'
})
const layerStore = useLayerStore();
const { fetchLayers } = layerStore;
const { layers } = storeToRefs(layerStore);
const pointLayers = computed(() => {
  return layers.value.filter(layer => layer.type === 'point');
});
// const layers = ref([
//       { label: '图层0', value: 'layer0' },
//     ]);
const isHidden = ref(true);
const toggleRotation = () => {
  isHidden.value = !isHidden.value;
};
const toLeft = () => {
  isHidden.value = false;
};
onMounted(async () => {
  await fetchLayers();
});
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