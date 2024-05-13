<template>
  <el-dialog
    width="400"
    v-model="uploadDialog"
    >
    <template #header="{ titleId, titleClass }">
      <span :id="titleId" :class="titleClass" style="font-weight: bold; font-size: 15px;">
        上传数据
      </span>
    </template>
    <div class="parting-line"></div>

  <el-upload
    action
    class="upload-demo"
    drag
    accept=".xlsx"
    :limiit="1"
    :auto-upload="false"
    :on-change="fileChange"
  >
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">
      拖拽文件 <em>或点击上传</em>
    </div>
    <template #tip>
      <div class="el-upload__tip">
        请选择xlsx格式数据
      </div>
    </template>
  </el-upload>
  <el-button type="primary" @click="upLoadFile" :loading="loading">上传</el-button>
</el-dialog>

</template>

<script setup>
import { ElMessage } from 'element-plus';
import { UploadFilled } from '@element-plus/icons-vue';
import { useDialogStore } from '@/stores/dialog';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { upload } from '@/api/api';
import * as xlsx from 'xlsx';
import { useManagerStore } from '@/stores/layer';
defineOptions({
  name: 'Upload',
});
const managerStore = useManagerStore();
const loading = ref(false);
const dialogStore = useDialogStore();
const { uploadDialog } = storeToRefs(dialogStore);
const { closeUploadDialog } = dialogStore;
const uploadFile = ref(null);
const fileChange = (file) => {
  console.log('file', file);
  uploadFile.value = file.raw;
};
const readFile = (file) => {
  return new Promise(resolve => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = ev => {
      resolve(ev.target.result);
    }
  })
}
const upLoadFile = async () => {
  let data = await readFile(uploadFile.value);
  let workbook = xlsx.read(data, {type: "binary"});
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  const pointdata = xlsx.utils.sheet_to_json(worksheet);
  loading.value = true;
  await upload(pointdata);
  loading.value = false;
  ElMessage({
    message: '上传数据成功',
    type: 'success',
  });
  await managerStore.getTableData();
  await managerStore.getstotal();
  closeUploadDialog();
};
</script>
<style lang="scss" scoped>
.el-button {
  position: relative;
  left: 300px;
  border-radius: 7px;
}
</style>