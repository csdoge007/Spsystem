import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { getLayers } from '../api/api';
import { layerGroup, marker, Marker } from 'leaflet';
// import { usePointStore } from './point';
export const useLayerStore = defineStore('layer', () => {
  const layers = ref([]);
  const layerElements = reactive({});
  const map = ref(null);
  const editingPoint = ref(null);
  const editing = ref(false);
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
  const setEditedMap = (mp) => {
    map.value = mp;
  }
  const fetchLayers = async () => {
    layers.value = await getLayers().then(res => res.data);
    clearMap();
    for (const layer of layers.value) {
      const { type, name, children, isviewed } = layer;
      if (isviewed) {
        drawElements({type, name, children});
      }
    }
  };
  const clearMap = () => {
    // const pointStore = usePointStore();
    map.value.eachLayer(function(layer) {
      // 判断图层是否是标记点
      if (layer instanceof Marker) {
        map.value.removeLayer(layer);
      }
    });
  };
  const drawElements = ({type, name, children}) => {
    if (!children || children.length <= 0) return;
    // const pointStore = usePointStore();
    if (type === 'point') {
      if (layerElements[name]) {
        map.value.removeLayer(layerElements[name]);
      }
      const markers = layerGroup();
      layerElements[name] = markers;
      for (const point of children) {
        let markerLayer = marker([point.locationy, point.locationx]).addTo(markers);
        markerLayer.bindPopup(point.title);
        markerLayer.openPopup();
      }
      map.value.addLayer(markers);
    }
  };
  const clearElements = (name) => {
    // const pointStore = usePointStore();
    map.value.removeLayer(layerElements[name]);
    layerElements[name] = null;
  };
  const changeLayerView = (name) => {
    const layer = layers.value.filter(layer => layer.name === name)[0];
    layer.isviewed = !layer.isviewed;
  }
  return { editing, edited, clearEditingPoint, setEditingPoint, layers, fetchLayers, drawElements, clearElements, changeLayerView, setEditedMap };
});