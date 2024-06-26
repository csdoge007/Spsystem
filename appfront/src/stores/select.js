import { defineStore } from 'pinia';
import { ref } from 'vue';
import { usePointStore } from './point';
import { getNewLayers } from '../api/api';
import { getThermalData } from '../api/api';
export const useSelectStore = defineStore('select', () => {
  const selectedPoints = ref([]);
  const isPopuped = ref(false);
  const pointLatLng = ref(null);
  const popupName = ref('');
  const layers = ref([]);
  const fetchLayers = async () => {
    const dataLayer = await getNewLayers().then(res => res.data);

    layers.value = dataLayer.filter(layer => layer.type === 'point');
  };
  function changePopupName (newName) {
    popupName.value = newName;
  }
  function changePointLatLng (newPosition) {
    // if (pointLatLng.value !== null) {
    //   const { lat, lng } = pointLatLng.value;
    //   if (lat === newPosition.lat && lng === newPosition.lng) {
    //     return;
    //   }
    // }
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
    console.log('points', points);
  }
  function panToActivePoint(idx) {
    const pointStore = usePointStore();
    const { x, y, name } = selectedPoints.value[idx];
    pointStore.map.panTo([y, x]);
    openPopup();
    changePopupName(name);
    changePointLatLng({lng: x, lat: y});
  }
  return { changePopupName, popupName, changePointLatLng, pointLatLng, selectedPoints, importSelectedPoints, panToActivePoint, isPopuped, closePopup, openPopup, fetchLayers, layers };
});

export const useRecommendStore = defineStore('recommend', () => {
  const isdrawedBox = ref(false);
  const bboxlatlngs = ref([]);
  const thermalData = ref([]);
  const getThermal = async ({type, radius}) => {
    const data = await getThermalData(bboxlatlngs.value, type, radius);
    thermalData.value = data.data;
  };
  const drawBox = () => {
    isdrawedBox.value = true;
  };
  const clearBox = () => {
    isdrawedBox.value = false;
  };
  const setBboxlatlngs = (latlngs) => {
    bboxlatlngs.value = latlngs;
    console.log('bboxlatlngs', bboxlatlngs.value);
  };
  return { thermalData, getThermal, setBboxlatlngs, bboxlatlngs, isdrawedBox, drawBox, clearBox };
})

