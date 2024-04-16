import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useDialogStore = defineStore('dialog', () => {
  const layerDialog = ref(false);
  const openLayerDialog = () => {
    layerDialog.value = true;
  };
  const closeLayerDialog = () => {
    layerDialog.value = false;
  };
  return { layerDialog, openLayerDialog, closeLayerDialog };
});