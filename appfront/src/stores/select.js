import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useSelectStore = defineStore('select', () => {
  const selectedPoints = ref([]);
  function importSelectedPoints(points) {
    selectedPoints.value = points;
  }
  return { selectedPoints, importSelectedPoints };
});