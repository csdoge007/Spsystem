<template>
  <div class="edit">
    <InfoSubmission :layers="layers" v-if="!hidden" ref="infoSubmission" @hide="hide"></InfoSubmission>
    <Map :isEdit="true"></Map>
  </div>

</template>

<script setup>
import { usePointStore } from '@/stores/point';
import { ref, watch, nextTick } from 'vue';
import InfoSubmission from '@/components/InfoSubmission/index.vue';
import Map from '@/components/Map/index.vue';
defineOptions({
  name: 'Edit'
})
const layers = ref([
      { label: '图层0', value: 'layer0' },
    ]); // 选项数组
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
</script>

<style scoped>
.edit {
  position: relative;
  height: 100%;
}
</style>