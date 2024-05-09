<template>
  <div class="edit">
    <LeftSlide class="leftslide" :hideLeft="isHidden" @toggleRotation="toggleRotation">
      <EditPanel></EditPanel>
    </LeftSlide>
    <div class="map-info">
      <InfoSubmission v-if="!hidden" ref="infoSubmission" @hide="hide"></InfoSubmission>
      <Map :isEdit="true" class="map"></Map>
    </div>
  </div>
</template>

<script setup>
import LeftSlide from '@/components/LeftSlide.vue';
import { usePointStore } from '@/stores/point';
import { useLayerStore } from '@/stores/layer';
import { ref, watch, nextTick, onMounted } from 'vue';
import InfoSubmission from '@/components/InfoSubmission/index.vue';
import Map from '@/components/Map/index.vue';
import EditPanel from '@/components/EditPanel/index.vue';
const layerStore = useLayerStore();
const { fetchLayers } = layerStore;
defineOptions({
  name: 'Edit'
});
const isHidden = ref(true);
const toggleRotation = () => {
  isHidden.value = !isHidden.value;
};
// const layers = ref([
//       { label: '图层0', value: 'layer0' },
//     ]); 
const pointStore = usePointStore();
const hidden = ref(true);
const infoSubmission = ref(null);
// const position = computed(() => store.position);
watch(() => pointStore.position, (position) => {
  const { x, y } = position;
  if (x !== 0 || y !== 0) {
    hidden.value = false;
    nextTick(() => {
      const infoEl = infoSubmission.value.$el;
      if (infoEl) {
        infoEl.style.left = `${x}px`;
        infoEl.style.top = `${y}px`;
      }
    })
  } else {
    hidden.value = true;
  }
})
const hide = () => hidden.value = true;
onMounted(async () => {
  await fetchLayers();
});
</script>

<style scoped>
.edit {
  position: relative;
  height: 100%;
  margin: 0;
  display: flex;
}
.map-info {
  position: relative;
  height: 100%;
  width:100%;
}
.map {
  height: 100%;
}
</style>