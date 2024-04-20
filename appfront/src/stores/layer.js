import { defineStore } from 'pinia';
import { ref } from 'vue';
import { getLayers } from '../api/api';
export const useLayerStore = defineStore('layer', () => {
  const layers = ref([]);
  const fetchLayers = async () => {
    layers.value = await getLayers().then(res => res.data);
    console.log(layers.value);
  }
  return { layers, fetchLayers };
});