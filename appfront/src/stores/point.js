import { defineStore } from 'pinia';
import { ref } from 'vue';
export const usePointStore = defineStore('point', () =>{
  const position = ref({x: 0, y: 0});
  function changePosition(x, y) {
    position.value = { x, y};
  }
  return { position, changePosition};
})