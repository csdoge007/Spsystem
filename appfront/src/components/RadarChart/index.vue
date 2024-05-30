<template>
  <div class="radar-container">
    <div class="radar-left">
      <div class="title">| 选址评分雷达图</div>
      <div :id="name" class="radar"></div>
    </div>
    <RatePanel v-if="viewRated" v-bind="scores"></RatePanel>
  </div>
</template>

<script setup>
import { Chart } from '@antv/g2';
import { onMounted, reactive, ref } from 'vue';
import { getScores } from '@/api/api';
import { ElLoading } from 'element-plus'
import RatePanel from './RatePanel/index.vue';
defineOptions({
  name: 'RadarChart',
});
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  radius: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  }
});
const viewRated = ref(false);
const scores = reactive({
  resident: 50,
  competitor: 50,
  traffic: 50,
  rent: 50,
});
const initChart = () => {
  const data = [
    { item: '居民区' ,'分数': scores.resident },
    { item: '竞争者','分数': scores.competitor },
    { item: '交通' , '分数': scores.traffic },
    { item: '租金', '分数': scores.rent },
  ];

  const chart = new Chart({
    container: props.name,
    autoFit: true,
    width: 285,
    height: 230
  });

  chart.coordinate({ type: 'polar' });

  chart
    .data(data)
    .scale('x', { padding: 0.5, align: 0 })
    .scale('y', { tickCount: 5, domainMax: 100,domainMin: 0 })
    .axis('x', {
      grid: true,
      gridLineWidth: 2,
      tick: false,
      gridLineDash: [0, 0],
      labelAlign: 'horizontal',
      labelSpacing: 5
    })
    .axis('y', {
      zIndex: 1,
      title: false,
      gridConnect: 'line',
      gridLineWidth: 2,
      gridLineDash: [0, 0],
      label: false,
      gridAreaFill: (dataum, index, data) => {
        return index % 2 === 1 ? 'rgba(0, 0, 0, 0.04)' : '';
      },
    });
  chart
    .line()
    .encode('x', 'item')
    .encode('y', '分数')
    .style('lineWidth', 2);

  chart
    .point()
    .encode('x', 'item')
    .encode('y', '分数')
    .encode('shape', 'point')
    .encode('size', 3)
    .tooltip(null);
  chart.interaction('tooltip', { 
    crosshairsLineDash: [4, 4],
    // render: (event, { title, items }) => {
    //   return `<div style="display: flex; justify-content: center">
    //   <h3 style="padding:0;margin:0">${title}</h3>
    //   ${items.map(
    //     (d) =>
    //       `<span style="color: ${d.color}">${d.name}</span> ${d.value}`,
    //   )}
    //   </div>`;
    // }
  });
  chart.render();
}
onMounted(async () => {
  const loadingInstance = ElLoading.service({ target: '.radar', background:'#f6f6f6' });
  const scoreVals = await getScores({name: props.name, radius:props.radius, category: props.category});
  Object.assign(scores, scoreVals.data);
  console.log('score', scoreVals.data);
  initChart();
  loadingInstance.close();
  viewRated.value = true;
});
</script>

<style lang="scss" scoped>
.radar-container {
  width: 100%;
  background-color: rgb(246,246,246);
  position: relative;
  display: flex;
  .radar-left {
    display: flex;
    flex-direction: column;
    .radar {
      width: 285px; 
      height: 230px;
    }
    .title {
      margin-left: 10px;
      font-weight: bold;
      font-size: 15px;
      color: rgb(79,92,143);
      height: 25px;
    }
  }

}
</style>