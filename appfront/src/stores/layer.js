import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import { getLayers, getCurrentItems } from '../api/api';
import { layerGroup, marker, Marker } from 'leaflet';
// import { usePointStore } from './point';
import { getTotal } from '@/api/api';
export const useLayerStore = defineStore('layer', () => {
  const layers = ref([]);
  const layerElements = reactive({});
  const map = ref(null);
  const editingPoint = ref(null);
  const editing = ref(false);
  const changeLayerName = (name, id) => {
    const layer = layers.value.filter(item => item.name === id)[0];
    layer.name = name;
  };
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
    console.log('layer', layers.value);
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
        const customPopupContent = `<div><h3>点位信息</h3><p>点位名称：${point.title}</p><p>经度：${point.locationx}</p><p>纬度：${point.locationy}</p></div>`;
        markerLayer.bindPopup(customPopupContent);
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
  return { changeLayerName, map, editing, edited, clearEditingPoint, setEditingPoint, layers, fetchLayers, drawElements, clearElements, changeLayerView, setEditedMap };
});

export const useManagerStore = defineStore('manager', () => {
  const tableData = ref([]);
  const currentPage = ref(1);
  const itemQuantity = ref(1);
  const getTableData = async (itemInfo) => {
    if (itemInfo) {
      const data = await getCurrentItems(itemInfo);
      currentPage.value = itemInfo.currentPage;
      itemQuantity.value = itemInfo.itemQuantity;
      tableData.value = data.data;
    } else { 
      const data = await getCurrentItems({
        currentPage: currentPage.value,
        itemQuantity: itemQuantity.value,
      });
      tableData.value = data.data;
    }
  }
  const total = ref(0);
  const getstotal = async () => {
    const data = await getTotal();
    total.value = data.data;
  }
  return { tableData, getTableData, total, getstotal, currentPage, itemQuantity };
});