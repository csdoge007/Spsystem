import { defineStore } from 'pinia';
import { ref } from 'vue';
import { usePointStore } from './point';
export const useSelectStore = defineStore('select', () => {
  const selectedPoints = ref([]);
  const isPopuped = ref(false);
  const pointLatLng = ref(null);
  const popupName = ref('');
  const pointType = ref('');
  function changePopupName (newName) {
    popupName.value = newName;
  }
  function changePointType (type) {
    pointType.value = type;
  }
  function changePointLatLng (newPosition) {
    pointLatLng.value = newPosition;
  }
  function closePopup (){
    isPopuped.value = false;
  }
  function openPopup() {
    isPopuped.value = true;
  }
  function importSelectedPoints(points) {
    selectedPoints.value = points;
  }
  function panToActivePoint(idx) {
    const pointStore = usePointStore();
    console.log(selectedPoints.value[idx]);
    const { x, y, name } = selectedPoints.value[idx];
    pointStore.map.panTo([y, x]);
    if (idx >= 3) { 
      return;
    }
    openPopup();
    changePopupName(name);
    changePointLatLng({lng: x, lat: y});
  }
  return { changePointType, changePopupName, pointType, popupName, changePointLatLng, pointLatLng, selectedPoints, importSelectedPoints, panToActivePoint, isPopuped, closePopup, openPopup };
});