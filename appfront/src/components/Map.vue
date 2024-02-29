<template>
  <div id="map">
    <el-input v-model="input" placeholder="请输入网点名称" @input="searchPosition"/>
  </div>
</template>

<script setup>
import debounce from 'lodash.debounce';
import 'leaflet/dist/leaflet.css';
import { getPoi, searchPoi } from '../api/api';
// 引入Leaflet对象 挂载到Vue上，便于全局使用，也可以单独页面中单独引用
import { Map, TileLayer, marker, layerGroup, control, divIcon, icon } from 'leaflet'
import { onMounted, ref } from 'vue';
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
}
const importPoi = () => {
    return getPoi().then(response => {
        // console.log(response);
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
                if (type === '餐饮服务') {
                    let svgIcon = divIcon({
                        className: 'custom-svg-icon',
                        html: '<svg width="20" height="20" t="1707991511330" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1479" width="200" height="200"><path d="M512 0C228.693333 0 0 228.693333 0 512s228.693333 512 512 512 512-228.693333 512-512S795.306667 0 512 0z m303.786667 375.466667c-23.893333 30.72-47.786667 47.786667-71.68 75.093333-58.026667 61.44-78.506667 61.44-88.746667 61.44h-3.413333c-17.066667 0-30.72-3.413333-40.96-13.653333l-20.48 30.72 180.906666 187.733333c6.826667 10.24 13.653333 23.893333 10.24 37.546667 0 13.653333-6.826667 23.893333-13.653333 30.72-10.24 6.826667-20.48 10.24-30.72 10.24-10.24 0-20.48-3.413333-30.72-13.653334-6.826667-6.826667-105.813333-122.88-167.253333-191.146666l-177.493334 191.146666c-10.24 10.24-20.48 13.653333-34.133333 13.653334s-20.48 0-34.133333-10.24c-10.24-6.826667-13.653333-17.066667-13.653334-30.72-3.413333-13.653333 3.413333-30.72 10.24-40.96 10.24-10.24 153.6-150.186667 187.733334-180.906667l-13.653334-13.653333c-10.24 3.413333-75.093333-3.413333-92.16-20.48-13.653333-17.066667-98.986667-143.36-98.986666-201.386667 0-13.653333 6.826667-37.546667 30.72-37.546667 13.653333 0 30.72 10.24 54.613333 34.133334 13.653333 13.653333 150.186667 153.6 180.906667 187.733333l17.066666-20.48c-10.24-10.24-17.066667-20.48-23.893333-34.133333-3.413333-13.653333 0-30.72 6.826667-40.96l3.413333-6.826667c37.546667-47.786667 81.92-95.573333 129.706667-133.12 6.826667-6.826667 13.653333-6.826667 23.893333-6.826667s13.653333 6.826667 17.066667 13.653334c3.413333 6.826667 3.413333 13.653333 0 20.48-6.826667 6.826667-95.573333 102.4-105.813334 112.64-3.413333 3.413333-10.24 20.48-6.826666 20.48h3.413333c6.826667 0 10.24-3.413333 13.653333-6.826667 6.826667-6.826667 95.573333-98.986667 102.4-105.813333 3.413333-3.413333 10.24-6.826667 17.066667-6.826667 10.24 0 17.066667 6.826667 20.48 17.066667 3.413333 6.826667 3.413333 17.066667-3.413333 20.48-6.826667 10.24-98.986667 109.226667-102.4 116.053333-3.413333 3.413333-6.826667 6.826667-3.413334 13.653333l3.413334 3.413334c6.826667-3.413333 10.24-3.413333 13.653333-6.826667 3.413333-6.826667 95.573333-98.986667 105.813333-105.813333 3.413333-3.413333 10.24-6.826667 13.653334-6.826667 13.653333 0 23.893333 6.826667 30.72 17.066667 3.413333 6.826667 3.413333 17.066667 0 20.48z" fill="#FA8D14" p-id="1480"></path></svg>'
                    });
                    marker([locationy, locationx],{icon: svgIcon}).addTo(markersLayer).bindPopup(point.name).openPopup()
                } else {marker([locationy, locationx]).addTo(markersLayer).bindPopup(point.name).openPopup()};
            })
            // markersLayer.addTo(map);
            baseLayers[type] = markersLayer;
        });
        control.layers({ '底图': Layer }, baseLayers, { collapsed: false }).addTo(map);
        map.addLayer(baseLayers['餐饮服务']);
    });
    // map.addLayer(searchedLayer);
})
// initData();
</script>

<style scoped>
.el-input {
  position: absolute;
  top: 10px;
  left: 50px;
  width: 175px; /* 调整搜索框宽度 */
  z-index: 1000; /* 确保 el-input 显示在地图之上 */
}
</style>