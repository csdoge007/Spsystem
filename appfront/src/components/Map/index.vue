<template>
  <div id="map">
    <canvas id="canvasMap" style="display: none"></canvas>
    <el-input v-model="input" placeholder="请输入商业网点地址" @input="searchPosition" v-if="isEdit"/>
    <Popup :name="popupName" :x="pointLatLng.lng" :y="pointLatLng.lat" ref="popup" v-if="isPopuped && !isEdit && !isrecommended" @close="closePopup"></Popup>
  </div>
</template>

<script setup>
import { usePointStore } from '@/stores/point';
import { useLayerStore } from '@/stores/layer';
import { storeToRefs } from 'pinia';
import debounce from 'lodash.debounce';
import { getPoi, searchPoi, boxSelectPoi } from '@/api/api';
import { Map, TileLayer, marker, layerGroup, control, divIcon, Control, Marker, bounds, geoJSON, FeatureGroup, imageOverlay, polygon } from 'leaflet';
import 'leaflet-draw';
import { onMounted, ref, watch, onBeforeUnmount, nextTick } from 'vue';
import { svgTypes } from '@/assets/svg/svg';
import coordtransform from 'coordtransform';
import { useSelectStore, useRecommendStore } from '@/stores/select';
import Popup from '@/components/Popup/index.vue';
import * as turf from '@turf/turf';
import kriging from '@sakitam-gis/kriging';
defineOptions({
  name: 'Map'
})
const layerStore = useLayerStore();
const selectStore = useSelectStore();
const pointStore = usePointStore();
const recommendStore = useRecommendStore();
const { bboxlatlngs, thermalData } = storeToRefs(recommendStore);
const { pointLatLng, isPopuped, popupName } = storeToRefs(selectStore);
const { openPopup, closePopup, changePointLatLng, changePopupName } = selectStore;
let map = null;
let Layer = null;
let baseLayers = {};
let imageLayerGroup = null;
let drawControl = null;
let polygonDrawed = null;
let polygonBox = null;
let thermalMap = null;
const popup = ref(null);
const props = defineProps({
  isEdit: Boolean,
  isrecommended: Boolean
});
L.Popup.prototype._animateZoom = function (e) {
  if (!this._map) {
    return
  }
  let pos = this._map._latLngToNewLayerPoint(this._latlng, e.zoom, e.center),
    anchor = this._getAnchor()
  L.DomUtil.setPosition(this._container, pos.add(anchor))
}
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
const getKriging = (pointsData) => {
  let canvas = document.getElementById("canvasMap");
  let xlim = [bboxlatlngs.value[0][1], bboxlatlngs.value[2][1]];
  let ylim = [bboxlatlngs.value[0][0], bboxlatlngs.value[2][0]];
  const dis = Math.max(Math.abs(xlim[0] - xlim[1]), Math.abs(ylim[0] - ylim[1]));
  console.log('xlim', xlim);
  console.log('ylim', ylim);
  const params = {
    krigingModel: 'exponential',//model还可选'gaussian','spherical'
    krigingSigma2: 0,
    krigingAlpha: 100,
    canvasAlpha: 0.8,//canvas图层透明度-0.75
    colors: ["#00A600", "#01A600", "#03A700", "#04A700", "#05A800", "#07A800", "#08A900", "#09A900", "#0BAA00", "#0CAA00", "#0DAB00", "#0FAB00", "#10AC00", "#12AC00", "#13AD00", "#14AD00", "#16AE00", "#17AE00", "#19AF00", "#1AAF00", "#1CB000", "#1DB000", "#1FB100", "#20B100", "#22B200", "#23B200", "#25B300", "#26B300", "#28B400", "#29B400", "#2BB500", "#2CB500", "#2EB600", "#2FB600", "#31B700", "#33B700", "#34B800", "#36B800", "#37B900", "#39B900", "#3BBA00", "#3CBA00", "#3EBB00", "#3FBB00", "#41BC00", "#43BC00", "#44BD00", "#46BD00", "#48BE00", "#49BE00", "#4BBF00", "#4DBF00", "#4FC000", "#50C000", "#52C100", "#54C100", "#55C200", "#57C200", "#59C300", "#5BC300", "#5DC400", "#5EC400", "#60C500", "#62C500", "#64C600", "#66C600", "#67C700", "#69C700", "#6BC800", "#6DC800", "#6FC900", "#71C900", "#72CA00", "#74CA00", "#76CB00", "#78CB00", "#7ACC00", "#7CCC00", "#7ECD00", "#80CD00", "#82CE00", "#84CE00", "#86CF00", "#88CF00", "#8AD000", "#8BD000", "#8DD100", "#8FD100", "#91D200", "#93D200", "#95D300", "#97D300", "#9AD400", "#9CD400", "#9ED500", "#A0D500", "#A2D600", "#A4D600", "#A6D700", "#A8D700", "#AAD800", "#ACD800", "#AED900", "#B0D900", "#B2DA00", "#B5DA00", "#B7DB00", "#B9DB00", "#BBDC00", "#BDDC00", "#BFDD00", "#C2DD00", "#C4DE00", "#C6DE00", "#C8DF00", "#CADF00", "#CDE000", "#CFE000", "#D1E100", "#D3E100", "#D6E200", "#D8E200", "#DAE300", "#DCE300", "#DFE400", "#E1E400", "#E3E500", "#E6E600", "#E6E402", "#E6E204", "#E6E105", "#E6DF07", "#E6DD09", "#E6DC0B", "#E6DA0D", "#E6D90E", "#E6D710", "#E6D612", "#E7D414", "#E7D316", "#E7D217", "#E7D019", "#E7CF1B", "#E7CE1D", "#E7CD1F", "#E7CB21", "#E7CA22", "#E7C924", "#E8C826", "#E8C728", "#E8C62A", "#E8C52B", "#E8C42D", "#E8C32F", "#E8C231", "#E8C133", "#E8C035", "#E8BF36", "#E9BE38", "#E9BD3A", "#E9BC3C", "#E9BB3E", "#E9BB40", "#E9BA42", "#E9B943", "#E9B945", "#E9B847", "#E9B749", "#EAB74B", "#EAB64D", "#EAB64F", "#EAB550", "#EAB552", "#EAB454", "#EAB456", "#EAB358", "#EAB35A", "#EAB35C", "#EBB25D", "#EBB25F", "#EBB261", "#EBB263", "#EBB165", "#EBB167", "#EBB169", "#EBB16B", "#EBB16C", "#EBB16E", "#ECB170", "#ECB172", "#ECB174", "#ECB176", "#ECB178", "#ECB17A", "#ECB17C", "#ECB17E", "#ECB27F", "#ECB281", "#EDB283", "#EDB285", "#EDB387", "#EDB389", "#EDB38B", "#EDB48D", "#EDB48F", "#EDB591", "#EDB593", "#EDB694", "#EEB696", "#EEB798", "#EEB89A", "#EEB89C", "#EEB99E", "#EEBAA0", "#EEBAA2", "#EEBBA4", "#EEBCA6", "#EEBDA8", "#EFBEAA", "#EFBEAC", "#EFBFAD", "#EFC0AF", "#EFC1B1", "#EFC2B3", "#EFC3B5", "#EFC4B7", "#EFC5B9", "#EFC7BB", "#F0C8BD", "#F0C9BF", "#F0CAC1", "#F0CBC3", "#F0CDC5", "#F0CEC7", "#F0CFC9", "#F0D1CB", "#F0D2CD", "#F0D3CF", "#F1D5D1", "#F1D6D3", "#F1D8D5", "#F1D9D7", "#F1DBD8", "#F1DDDA", "#F1DEDC", "#F1E0DE", "#F1E2E0", "#F1E3E2", "#F2E5E4", "#F2E7E6", "#F2E9E8", "#F2EBEA", "#F2ECEC", "#F2EEEE", "#F2F0F0", "#F2F2F2"
    ]
  };
  const t = pointsData.map(point => point.resultSums);
  const maxValue = Math.max(...t);
  const minValue = Math.min(...t);
  t.forEach((val, idx) => {
    t[idx] = ((val - minValue) / (maxValue - minValue) * 100);
  });
  const x = pointsData.map(point => point.x);
  const y = pointsData.map(point => point.y);
  console.log('t', t);
  console.log('x', x);
  console.log('y', y);
  let variogram = kriging.train(t, x, y, params.krigingModel, params.krigingSigma2, params.krigingAlpha);
  const positions = bboxlatlngs.value.map(point => {
    return [point[1], point[0]];
  });
  let range = [positions];
  console.log('range', range);
  let grid = kriging.grid(range, variogram, dis / 200);
  kriging.plot(canvas, grid, [xlim[0], xlim[1]], [ylim[0], ylim[1]], params.colors);
  function returnImgae() {
    let mycanvas = document.getElementById("canvasMap");
    return mycanvas.toDataURL("image/png");
  }
  let imageBounds = [[ylim[0], xlim[0]], [ylim[1], xlim[1]]];
  if (thermalMap) {
    map.removeLayer(thermalMap);
  }
  thermalMap = imageOverlay(returnImgae(), imageBounds, { opacity: 0.8 }).addTo(imageLayerGroup);
  console.log('range', range);
  console.log('imageBounds', imageBounds);
};
watch(() => recommendStore.thermalData, (newValue) => {
  console.log('newValue', newValue);
  getKriging(newValue);
  if (polygonBox) {
    map.removeLayer(polygonBox);
  }
  if (polygonDrawed) {
    map.removeLayer(polygonDrawed);
    recommendStore.clearBox();
  }
  if (baseLayers['recommendLayer']) {
    map.removeLayer(baseLayers['recommendLayer']);
    baseLayers['recommendLayer'] = null;
  }
  const markers = layerGroup();
  baseLayers['recommendLayer'] = markers;
  for (let i = 0; i < 3; i++) {
    const { x, y, resultSums } = newValue[i];
    let svgIcon = divIcon({
        className: 'custom-svg-icon',
        html: svgTypes[i],
      });
    const markerLayer = marker([y, x], { icon: svgIcon, name: resultSums, type: 'recommend' }).addTo(markers);
    const customPopupContent = `<div><h3>点位坐标</h3><p>经度：${x}</p><br><p>纬度：${y}</p></div>`;
    markerLayer.bindPopup(customPopupContent);
    if (i === 0) map.panTo([y, x]);
  }
  map.addLayer(markers);
});
const input = ref('');
const showSearchPoi = (data, wrappedLayer) => {
  map.eachLayer(function (layer) {
    if (!props.isEdit) {
      if (layer !== Layer && layer !== baseLayers['selectedLayer']) { 
        map.removeLayer(layer);
      }
    } else {
      if (layer.options.type === 'proto') {
        map.removeLayer(layer);
      }
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
    map.setView([32.1141, 118.93198], 13)
    map.attributionControl.remove();
    map.zoomControl.setPosition('bottomright');
    if (props.isEdit) {
      layerStore.setEditedMap(map);
    } else {
      pointStore.setMap(map);
    }
    addDrawControl(props.isrecommended);
    imageLayerGroup = new FeatureGroup().addTo(map).bringToFront()
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
      let markerLayer = marker([locationy, locationx], { icon: svgIcon, type: 'proto'}).addTo(markersLayer);
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
    const infoEl = popup.value?.$el;
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
watch(() => props.isrecommended, (newValue) => {
  console.log('触发');
  map.removeControl(drawControl);
  addDrawControl(props.isrecommended);
  if (newValue) {
    if (baseLayers['selectedLayer']) {
      map.removeLayer(baseLayers['selectedLayer']);
    }
    if (baseLayers['recommendLayer']) {
      baseLayers['recommendLayer'].addTo(map);
    }
    if (imageLayerGroup) {
      imageLayerGroup.addTo(map);
    }
    if (thermalMap) {
      thermalMap.addTo(map);
    }
    if (polygonBox) {
      polygonBox.addTo(map);
    }
    if (polygonDrawed) {
      polygonDrawed.addTo(map);
    }
  } else {
    if (baseLayers['selectedLayer']) {
      baseLayers['selectedLayer'].addTo(map);
    }
    if (baseLayers['recommendLayer']) {
      map.removeLayer(baseLayers['recommendLayer']);
    }
    if (imageLayerGroup) {
      map.removeLayer(imageLayerGroup);
    }
    if (thermalMap) {
      map.removeLayer(thermalMap);
    }
    if (polygonBox) {
      map.removeLayer(polygonBox);
    }
    if (polygonDrawed) {
      map.removeLayer(polygonDrawed);
    }
  }
});
const addDrawControl = (isrecommended) => {
  drawControl = new Control.Draw({
    draw: {
      polyline: false,
      polygon: isrecommended,
      rectangle: false,
      circle: !isrecommended,
      circlemarker: false,
      marker: props.isEdit,
    },
    edit: false,
    remove: false, // 禁用删除
  });
  console.log('drawControl', drawControl);
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
        console.log('geometry', polygonGeoJson.geometry, e.layerType);
        const boundaries = turf.lineString(polygonGeoJson.geometry.coordinates[0]);
        let bbox = turf.bbox(boundaries); // 外包矩形范围
        console.log('bbox', bbox);
        let bboxPolygon = turf.bboxPolygon(bbox);
        const bboxlatlngs = bboxPolygon.geometry.coordinates[0];
        bboxlatlngs.forEach((item,idx) => {
          bboxlatlngs[idx] = [item[1], item[0]];
        });
        if (polygonBox) {
          map.removeLayer(polygonBox);
        }
        if (polygonDrawed) {
          map.removeLayer(polygonDrawed);
        }
        polygonDrawed = drawedLayer;
        polygonBox = polygon(bboxlatlngs, {color: 'red'}).addTo(map);
        recommendStore.drawBox();
        recommendStore.setBboxlatlngs(bboxlatlngs);
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
    // testKriging();
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
