import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { getLayers } from '../api/api';
import { layerGroup, marker } from 'leaflet';
import { usePointStore } from './point';
export const useLayerStore = defineStore('layer', () => {
  const layers = ref([]);
  const layerElements = reactive({});
  const fetchLayers = async () => {
    layers.value = await getLayers().then(res => res.data);
    for (const layer of layers.value) {
      const { type, name, children } = layer;
      drawElements({type, name, children});
    }
    console.log(layers.value);
  };
  const drawElements = ({type, name, children}) => {
    const pointStore = usePointStore();
    if (type === 'point') {
      const markers = layerGroup();
      layerElements[name] = markers;
      for (const point of children) {
        let markerLayer = marker([point.locationy, point.locationx]).addTo(markers);
        markerLayer.bindPopup(point.title);
        markerLayer.openPopup();
      }
      pointStore.map.addLayer(markers);
    }
  };
  const clearElements = (name) => {
    const pointStore = usePointStore();
    pointStore.map.removeLayer(layerElements[name]);
    layerElements[name] = null;
  };
  return { layers, fetchLayers, drawElements, clearElements };
});