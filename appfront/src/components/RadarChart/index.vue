<template>
  <div id="radar">
  </div>
</template>

<script setup>
import { Chart } from '@antv/g2';
import { onMounted } from 'vue';
const initChart = () => {
  const data = [
    { item: '居民区', type: 'a', score: 70 },
    { item: '竞争者', type: 'a', score: 60 },
    { item: '交通', type: 'a', score: 50 },
    { item: '租金', type: 'a', score: 50 },
  ];

  const chart = new Chart({
    container: 'radar',
    // autoFit: true,
    width: 250,
    height: 250
  });

  chart.coordinate({ type: 'polar' });

  chart
    .data(data)
    .scale('x', { padding: 0.5, align: 0 })
    .scale('y', { tickCount: 3, domainMax: 100,domainMin: 0 })
    .axis('x', {
      grid: true,
      gridLineWidth: 1,
      tick: false,
      gridLineDash: [0, 0],
    })
    .axis('y', {
      zIndex: 1,
      title: false,
      gridConnect: 'line',
      gridLineWidth: 1,
      gridLineDash: [0, 0],
    });
  chart
    .line()
    .encode('x', 'item')
    .encode('y', 'score')
    .encode('color', 'type')
    .style('lineWidth', 2);

  chart
    .point()
    .encode('x', 'item')
    .encode('y', 'score')
    .encode('color', 'type')
    .encode('shape', 'point')
    .encode('size', 3)
    .tooltip(null);

  // chart.interaction('tooltip', { crosshairsLineDash: [4, 4] });

  chart.render();
}
onMounted(() => {
  initChart();
});
</script>

<style lang="scss" scoped>
// #radar{
//   width: 100%;
//   height: 100%;
// }
</style>