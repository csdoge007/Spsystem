<template>
  <div id="map">
    <Header></Header>
    <el-input v-model="input" placeholder="请输入商业网点名称" @input="searchPosition" />
  </div>
</template>

<script setup>
import debounce from 'lodash.debounce';
import 'leaflet/dist/leaflet.css';
import { getPoi, searchPoi } from '../api/api';
// 引入Leaflet对象 挂载到Vue上，便于全局使用，也可以单独页面中单独引用
import { Map, TileLayer, marker, layerGroup, control, divIcon, FeatureGroup, Control, drawLocal, Toolbar } from 'leaflet';
import 'leaflet-draw';
import { onMounted, ref } from 'vue';
import { svgTypes } from '../assets/svg/svg';
import Header from './Header.vue';

// const map = ref({});
let map = null;
let Layer = null;
let baseLayers = {};
// const searchedLayer = null;
const input = ref('');
const showSearchPoi = (data) => {
  map.eachLayer(function (layer) {
    if (layer !== Layer) { // 排除底图
      map.removeLayer(layer);
    }
  });
  const markers = layerGroup();
  baseLayers['searchLayer'] = markers;
  data.forEach(dataPoint => {
    const { locationy, locationx, name } = dataPoint;
    let markerLayer = marker([locationy, locationx]).addTo(markers); 
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
  })
}, 1000);
const initMap = () => {
  if (!map) {
    map = new Map('map', {drawControl: true});
    Layer = new TileLayer('http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}')
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
  })
};

const addDrawControl = () => {
  let drawnItems = new FeatureGroup();
  map.addLayer(drawnItems);
  let drawControl = new Control.Draw({
    draw: {
      polyline: false,
      polygon: false,
      rectangle: false,
      circle: false,
      circlemarker: false,
      marker: false,
      },
    edit: {
      featureGroup: drawnItems,
    },
    edit: false, // 禁用编辑
    remove: false, // 禁用删除
  });
  map.addControl(drawControl);
};
const addDrawEvents = () => {
  map.on(L.Draw.Event.CREATED, function (e) {
    let type = e.layerType;
    let layer = e.layer;
    if (type === 'marker') {
      console.log(type);
    }
    map.addLayer(layer);
  });
  map.on('draw:edited', function (e) {
    var layers = e.layers;
    layers.eachLayer(function (layer) {
        //do whatever you want; most likely save back to db
        
    });
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