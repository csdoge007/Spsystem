<template>
  <div id="map">
    <el-input v-model="input" placeholder="请输入商业网点地址" @input="searchPosition" v-if="isEdit"/>
    <Popup :name="popupName" ref="popup" v-if="isPopuped && !isEdit" @close="closePopup"></Popup>
  </div>
</template>

<script setup>
import { usePointStore } from '@/stores/point';
import { useLayerStore } from '@/stores/layer';
import { storeToRefs } from 'pinia';
import debounce from 'lodash.debounce';
import 'leaflet/dist/leaflet.css';
import { getPoi, searchPoi, boxSelectPoi } from '@/api/api';
import { Map, TileLayer, marker, layerGroup, control, divIcon, Control, Marker, bounds } from 'leaflet';
import 'leaflet-draw';
import { onMounted, ref, watch, onBeforeUnmount, nextTick } from 'vue';
import { svgTypes } from '@/assets/svg/svg';
import coordtransform from 'coordtransform';
import { useSelectStore } from '@/stores/select';
import Popup from '@/components/Popup/index.vue';
defineOptions({
  name: 'Map'
})
const layerStore = useLayerStore();
const selectStore = useSelectStore();
const pointStore = usePointStore();
const { pointLatLng, isPopuped, popupName } = storeToRefs(selectStore);
const { openPopup, closePopup, changePointLatLng, changePopupName } = selectStore;
let map = null;
let Layer = null;
let baseLayers = {};
const popup = ref(null);
const props = defineProps({
  isEdit: Boolean,
});
watch(() => selectStore.selectedPoints, (newPoints) => {
  if (props.isEdit) return;
  if (baseLayers['selectedLayer']) {
    map.removeLayer(baseLayers['selectedLayer']);
    baseLayers['selectedLayer'] = null;
  }

  const markers = layerGroup();
  baseLayers['selectedLayer'] = markers;
  for (let i = 0; i < newPoints.length; i++) {
    const { x, y, name } = newPoints[i]; 
    if (i < 3) {
      let svgIcon = divIcon({
        className: 'custom-svg-icon',
        html: svgTypes[i],
      });
      marker([y, x], { icon: svgIcon, name, type: 'rank' }).addTo(markers);
    } else {
      marker([y, x], { name, type: 'rank' }).addTo(markers);
    }
    if (i === 0) map.panTo([y, x]);
  }
  map.addLayer(markers);
  
});
const input = ref('');
const showSearchPoi = (data, wrappedLayer) => {
  map.eachLayer(function (layer) {
    if (layer !== Layer && layer !== baseLayers['selectedLayer']) { // 排除底图
      map.removeLayer(layer);
    }
  });
  if (wrappedLayer) map.addLayer(wrappedLayer);
  const markers = layerGroup();
  baseLayers['searchLayer'] = markers;
  data.forEach(dataPoint => {
    const { locationx, locationy, name } = dataPoint;
    // const poiPosition = coordtransform.wgs84togcj02(locationx, locationy); 
    
    // const poiPosition = coordtransform.gcj02towgs84(locationx, locationy); 

    const poiPosition = [locationx, locationy]; 
    let markerLayer = marker([poiPosition[1], poiPosition[0]]).addTo(markers);
    markerLayer.bindPopup(name);
    markerLayer.openPopup();
  });
  map.addLayer(markers);
}
const searchPosition = debounce(function () {
  searchPoi(input.value).then(response => {
    // showSearchPoi(response.data);
    const { data } = response;
    console.log(data);
    if (baseLayers['searchLayer']) {
      map.removeLayer(baseLayers['searchLayer']);
      baseLayers['searchLayer'] = null;
    }
    showSearchPoi(data);
  }).catch(err => {
    console.error(err);
  });
}, 1000);
const initMap = () => {
  if (!map) {
    map = new Map('map');
    Layer = new TileLayer('http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}',{
      cacheControl: 'public,max-age=3600' 
    })
    Layer.addTo(map)
    map.setView([32.1141, 118.93198], 11)
    map.attributionControl.remove();
    map.zoomControl.setPosition('bottomright');
    if (props.isEdit) {
      layerStore.setEditedMap(map);
    } else {
      pointStore.setMap(map);
    }
    addDrawControl();
  }
}
const buildLayerTree = (data) => {
  Object.keys(data).forEach((type) => {
    const markersLayer = layerGroup();
    data[type].forEach((poi) => {
      const { locationy, locationx } = poi;
      let svgIcon = divIcon({
        className: 'custom-svg-icon',
        html: svgTypes[type],
      });
      let markerLayer = marker([locationy, locationx], { icon: svgIcon}).addTo(markersLayer);
      markerLayer.bindPopup(poi.name);
      markerLayer.openPopup();
    })
    baseLayers[type] = markersLayer;
  });
  const controlLayer = control.layers({ '底图': Layer }, baseLayers, { collapsed: true });
  controlLayer.addTo(map);
}


const showPopup = () => {
  const containerPosition = map.latLngToContainerPoint(pointLatLng.value);
  const { x, y } = containerPosition;
  nextTick(() => {
    const infoEl = popup.value.$el;
    if (infoEl) {
      infoEl.style.left = `${x}px`;
      infoEl.style.top = `${y}px`;
    }
  });
}
const movePopupEvent = () => {
  if (!isPopuped.value) return;
  showPopup();
}
watch(pointLatLng, () => {
  showPopup();
});
const addPopupEvents = () => {
  map.on('click', function(event) {
    if (layerStore.editing) {
      return;
    }
    let clickedPoint = event.layerPoint; 

    // 遍历所有标记点
    map.eachLayer(function(layer) {
      if (layer instanceof Marker && layer.options.type === 'rank') {
        // 获取标记点的图标大小
        let iconSize = layer.options.icon.options.iconSize;
        // 获取标记点在地图上的像素坐标
        let markerPoint = map.latLngToLayerPoint(layer.getLatLng());
        console.log(markerPoint, '..');
        // 计算标记点的包围盒范围
        let markerBounds = bounds(markerPoint.add([-10, -10]), markerPoint.add([40, 40]));

        // 判断点击的点是否在标记点的包围盒范围内
        if (markerBounds.contains(clickedPoint)) {
          console.log('iconSize', iconSize);
          // 如果点击的点在标记点的范围内，则认为点击到了标记点
          console.log('click-marker', layer.options.name);
          openPopup();
          // popupName.value = layer.options.name;
          changePopupName(layer.options.name);
          changePointLatLng({ ...layer.getLatLng() });
          console.log('ss', layer.getLatLng());
        }
      }
    });
  });
  map.on('move', movePopupEvent);
};
const addDrawControl = () => {
  let drawControl = new Control.Draw({
    draw: {
      polyline: false,
      polygon: !props.isEdit,
      rectangle: false,
      circle: !props.isEdit,
      circlemarker: false,
      marker: props.isEdit,
    },
    edit: false,
    remove: false, // 禁用删除
  });
  console.log(drawControl);
  map.addControl(drawControl);
};
const moveEditEvent = ()=> {
  if (!layerStore.editing) return;
  const containerPosition = map.latLngToContainerPoint(markerLatLng);
  const { x, y } = containerPosition;
  pointStore.changePosition(x, y);
}
let markerLatLng;
const addDrawEvents = async () => {
  map.on(L.Draw.Event.CREATED, async function (e) {
    let drawedLayer = e.layer;
    try {
      map.addLayer(drawedLayer);
      const polygonGeoJson = drawedLayer.toGeoJSON();
      if (e.layerType === 'circle') { 
        // 获取圆的半径和圆心
        const circleCenter = drawedLayer.getLatLng();
        const { radius } = drawedLayer.options;
        const coordinates = coordtransform.gcj02towgs84(circleCenter.lng, circleCenter.lat);
        // const coordinates = [circleCenter.lng, circleCenter.lat];
        const circleGeometry = {
          type: 'circle',
          coordinates,
          radius,
        }
        const data = await boxSelectPoi(circleGeometry).then(response => response.data);
        showSearchPoi(data, drawedLayer);
      } else if (e.layerType === 'marker') {
        if (layerStore.editing) {
          console.log('editing', pointStore.editing);
          layerStore.clearEditingPoint();
        }
        layerStore.setEditingPoint(drawedLayer);
        markerLatLng = drawedLayer.getLatLng();
        const { lng, lat } = markerLatLng;
        const containerPosition = map.latLngToContainerPoint(markerLatLng);
        const { x, y } = containerPosition;
        pointStore.changePosition(x, y);
        pointStore.changeLocation(lng, lat);
        map.panTo([lat, lng]);
        map.on('move', moveEditEvent);
      } else {
        await boxSelectPoi(polygonGeoJson.geometry);
      }
    } catch (err) {
      console.error(err);
    }
  });
};
onMounted(async () => {
  initMap();
  try {
    const { data } = await getPoi();
    buildLayerTree(data);
    addDrawEvents();
    addPopupEvents();
  } catch (err) {
    console.error(err);
  }
});
onBeforeUnmount(() => {
  map.off('move', moveEditEvent);
  map.off('move', movePopupEvent);
});
</script>

<style scoped>
.el-input {
  position: absolute;
  top: 13px;
  left: 50px;
  width: 175px;
  z-index: 1000;
}
</style>
