<template>
  <div id="map">
    <Header></Header>
    <el-input v-model="input" placeholder="请输入商业网点名称" @input="searchPosition" />
  </div>
</template>

<script setup>
import debounce from 'lodash.debounce';
import 'leaflet/dist/leaflet.css';
import { getPoi, searchPoi, boxSelectPoi } from '../api/api';
// 引入Leaflet对象 挂载到Vue上，便于全局使用，也可以单独页面中单独引用
import { Map, TileLayer, marker, layerGroup, control, divIcon, Control } from 'leaflet';
import 'leaflet-draw';
import { onMounted, ref } from 'vue';
import { svgTypes } from '../assets/svg/svg';
import Header from './Header.vue';
import coordtransform from 'coordtransform';

// const map = ref({});
let map = null;
let Layer = null;
let baseLayers = {};
// const searchedLayer = null;
const input = ref('');
const showSearchPoi = (data, wrappedLayer) => {
  map.eachLayer(function (layer) {
    if (layer !== Layer) { // 排除底图
      map.removeLayer(layer);
    }
  });
  if (wrappedLayer) map.addLayer(wrappedLayer);
  const markers = layerGroup();
  baseLayers['searchLayer'] = markers;
  data.forEach(dataPoint => {
    const { locationx, locationy, name } = dataPoint;
    // const poiPosition = coordtransform.wgs84togcj02(locationx, locationy); 
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
    addDrawControl();
  }
}
const importPoi = () => {
  return getPoi().then(response => {
    return response.data;
  }).catch(err => {
    console.error(err);
  });
};

const addDrawControl = () => {
  let drawControl = new Control.Draw({
    draw: {
      polyline: false,
      polygon: true,
      rectangle: false,
      circle: true,
      circlemarker: false,
      marker: false,
    },
    edit: false,
    remove: false, // 禁用删除
  });
  console.log(drawControl);
  map.addControl(drawControl);
};
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
        console.log(circleCenter);
        const circleGeometry = {
          type: 'circle',
          coordinates,
          radius,
        }
        const data = await boxSelectPoi(circleGeometry).then(response => response.data);
        showSearchPoi(data, drawedLayer);
      } else {
        await boxSelectPoi(polygonGeoJson.geometry);
      }
    } catch (err) {
      console.error(err);
    }
  });
};
onMounted(() => {
  initMap();
  let poiImport = importPoi();
  let initBaseLayer = poiImport.then(data => {
    console.log(Object.keys(data));
    Object.keys(data).forEach((type) => {
      const markersLayer = layerGroup();
      data[type].forEach((point) => {
        const { locationy, locationx } = point;
        let svgIcon = divIcon({
          className: 'custom-svg-icon',
          html: svgTypes[type],
        });
        marker([locationy, locationx], { icon: svgIcon }).addTo(markersLayer).bindPopup(point.name).openPopup();

      })
      baseLayers[type] = markersLayer;
    });
    const controlLayer = control.layers({ '底图': Layer }, baseLayers, { collapsed: false });
    controlLayer.addTo(map);
  });
  addDrawEvents();
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
