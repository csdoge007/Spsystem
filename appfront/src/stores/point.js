import { defineStore } from 'pinia';
import { ref } from 'vue';
export const usePointStore = defineStore('point', () =>{
  const position = ref({x: 0, y: 0});
  const location = ref({locationx: 0, locationy: 0});
  const editingPoint = ref(null);
  const map = ref(null);
  const editing = ref(false);
  function changePosition(x, y) {
    position.value = { x, y };
  }
  function changeLocation(locationx, locationy) {
    location.value = { locationx, locationy };
  }
  function clearEditingPoint() {
    map.value.removeLayer(editingPoint.value);
    editingPoint.value = null;
    editing.value = false;
  }
  function setEditingPoint(pointLayer) {
    editingPoint.value = pointLayer;
    editing.value = true;
  }
  function edited() {
    editing.value = false;
  }
  function setMap(mp) {
    map.value = mp;
  }
  return { editing, edited, position, location, changePosition, changeLocation, clearEditingPoint, setEditingPoint, map, setMap };
})