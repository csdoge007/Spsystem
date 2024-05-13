import { defineStore } from 'pinia';
import { ref } from 'vue';
export const useDialogStore = defineStore('dialog', () => {
  const layerDialog = ref(false);
  const reNameDialog = ref(false);
  const updateDialog = ref(false);
  const uploadDialog = ref(false);
  const reNameId = ref(-1);
  const openUploadDialog = () => {
    uploadDialog.value = true;
  };
  const closeUploadDialog = () => {
    uploadDialog.value = false;
  };
  const openUpdateDialog = () => {
    updateDialog.value = true;
  };
  const closeUpdateDialog = () => {
    updateDialog.value = false;
  };
  const changeReNameId = (id) => {
    reNameId.value = id;
  };
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
  return { closeUploadDialog, openUploadDialog, uploadDialog, updateDialog, openUpdateDialog, closeUpdateDialog, changeReNameId, reNameId, reNameDialog, openReNameDialog, closeReNameDialog, layerDialog, openLayerDialog, closeLayerDialog };
});