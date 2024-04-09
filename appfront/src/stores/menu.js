import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useMenuStore = defineStore('menu', () => {
  const activeMenuItem = ref('select');
  const setActiveItem = (newActiveItem) => {
    activeMenuItem.value = newActiveItem;
  };
  return { activeMenuItem, setActiveItem };
});