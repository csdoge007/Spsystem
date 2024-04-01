import { defineStore } from 'pinia';
import { ref } from 'vue';
import { usePointStore } from './point';
export const useSelectStore = defineStore('select', () => {
  const selectedPoints = ref([]);
  function importSelectedPoints(points) {
    selectedPoints.value = points;
  }
  function panToActivePoint(idx) {
    const pointStore = usePointStore();
    console.log(selectedPoints.value[idx]);
    const { x, y } = selectedPoints.value[idx];
    pointStore.map.panTo([y, x]);
  }
  return { selectedPoints, importSelectedPoints, panToActivePoint };
});