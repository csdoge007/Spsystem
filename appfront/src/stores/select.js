import { defineStore } from 'pinia';
import { ref } from 'vue';
import { usePointStore } from './point';
export const useSelectStore = defineStore('select', () => {
  const selectedPoints = ref([]);
  const isPopuped = ref(false);
  const pointLatLng = ref(null);
  const popupName = ref('');
  function changePopupName (newName) {
    popupName.value = newName;
  }
  function changePointLatLng (newPosition) {
    if (pointLatLng.value !== null) {
      const { lat, lng } = pointLatLng.value;
      if (lat === newPosition.lat && lng === newPosition.lng) {
        return;
      }
    }
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
  return { changePopupName, popupName, changePointLatLng, pointLatLng, selectedPoints, importSelectedPoints, panToActivePoint, isPopuped, closePopup, openPopup };
});