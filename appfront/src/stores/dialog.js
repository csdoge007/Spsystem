import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useDialogStore = defineStore('dialog', () => {
  const layerDialog = ref(false);
  const reNameDialog = ref(false);
  const reNameId = ref(-1);
  const changeReNameId = (id) => {
    reNameId.value = id;
  }
  const openLayerDialog = () => {
    layerDialog.value = true;
  };
  const closeLayerDialog = () => {
    layerDialog.value = false;
  };
  const openReNameDialog = () => {
    reNameDialog.value = true;
  };
  const closeReNameDialog = () => {
    reNameDialog.value = false;
  };
  return { changeReNameId, reNameId, reNameDialog, openReNameDialog, closeReNameDialog, layerDialog, openLayerDialog, closeLayerDialog };
});