import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { getLayers } from '../api/api';
import { layerGroup, marker, Marker } from 'leaflet';
import { usePointStore } from './point';
export const useLayerStore = defineStore('layer', () => {
  const layers = ref([]);
  const layerElements = reactive({});
  const fetchLayers = async () => {
    layers.value = await getLayers().then(res => res.data);
    clearMap();
    for (const layer of layers.value) {
      const { type, name, children, isviewed } = layer;
      if (isviewed) {
        drawElements({type, name, children});
      }
    }
    console.log(layers.value);
  };
  const clearMap = () => {
    const pointStore = usePointStore();
    pointStore.map.eachLayer(function(layer) {
      // 判断图层是否是标记点
      if (layer instanceof Marker) {
        pointStore.map.removeLayer(layer);
      }
    });
  };
  const drawElements = ({type, name, children}) => {
    if (!children || children.length <= 0) return;
    const pointStore = usePointStore();
    if (type === 'point') {
      if (layerElements[name]) {
        pointStore.map.removeLayer(layerElements[name]);
      }
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
  const changeLayerView = (name) => {
    const layer = layers.value.filter(layer => layer.name === name)[0];
    layer.isviewed = !layer.isviewed;
  }
  return { layers, fetchLayers, drawElements, clearElements, changeLayerView };
});