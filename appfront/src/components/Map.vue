<template>
  <div id="map">
    <Header></Header>
    <el-input v-model="input" placeholder="请输入商业网点名称" @input="searchPosition"/>
  </div>
</template>

<script setup>
import debounce from 'lodash.debounce';
import 'leaflet/dist/leaflet.css';
import { getPoi, searchPoi } from '../api/api';
// 引入Leaflet对象 挂载到Vue上，便于全局使用，也可以单独页面中单独引用
import { Map, TileLayer, marker, layerGroup, control, divIcon } from 'leaflet'
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
    marker([locationy, locationx]).addTo(markers).bindPopup(name); // 使用红色图标
  });
  map.addLayer(markers);
}
const searchPosition = debounce(function(){
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
},1000);
const initData = () => {
    map = new Map('map')
    Layer = new TileLayer('http://wprd04.is.autonavi.com/appmaptile?lang=zh_cn&size=1&style=7&x={x}&y={y}&z={z}')
    Layer.addTo(map)
    map.setView([32.1141, 118.93198], 11)
    map.attributionControl.remove();
    map.zoomControl.setPosition('bottomright');
}
const importPoi = () => {
    return getPoi().then(response => {
        return response.data;
    })
}

onMounted(() => {
    initData();
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
                marker([locationy, locationx],{icon: svgIcon}).addTo(markersLayer).bindPopup(point.name).openPopup();
                    
            })
            baseLayers[type] = markersLayer;
        });
        const controlLayer = control.layers({ '底图': Layer }, baseLayers, { collapsed: false });
        controlLayer.addTo(map);
        controlLayer.setPosition
    });
})
</script>

<style scoped>

.el-input {
  position: absolute;
  top: 50px;
  left: 10px;
  width: 175px; /* 调整搜索框宽度 */
  z-index: 1000; /* 确保 el-input 显示在地图之上 */
}
</style>