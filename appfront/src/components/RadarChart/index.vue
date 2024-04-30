<template>
  <div id="radar">
  </div>
</template>

<script setup>
import { Chart } from '@antv/g2';
import { onMounted, reactive } from 'vue';
import { getScores } from '@/api/api';
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
})
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
    container: 'radar',
    autoFit: true,
    width: 300,
    height: 300
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

  chart.interaction('tooltip', { crosshairsLineDash: [4, 4] });
  chart.render();
}
onMounted(async () => {
  const scoreVals = await getScores({name: props.name, radius:props.radius, category: props.category});
  Object.assign(scores, scoreVals.data);
  console.log('score', scoreVals.data);
  initChart();
});
</script>

<style lang="scss" scoped>
#radar {
  width: 300px; 
}
</style>