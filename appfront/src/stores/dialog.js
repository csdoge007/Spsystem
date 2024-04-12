import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useDialogStore = defineStore('dialog', () => {
  const layerDialog = ref(false);
  const openLayerDialog = () => {
    layerDialog.value = true;
  }
  return { layerDialog, openLayerDialog };
});