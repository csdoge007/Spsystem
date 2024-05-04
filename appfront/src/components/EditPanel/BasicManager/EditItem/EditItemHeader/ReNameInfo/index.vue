<template>
  <el-dialog
    width="400"
    v-model="reNameDialog"
    >
    <template #header="{ titleId, titleClass }">
      <span :id="titleId" :class="titleClass" style="font-weight: bold; font-size: 15px;">
        重命名图层
      </span>
    </template>
    <el-form ref="ruleFormRef" :rules="rules" :model="form" label-width="100px" class="demo-ruleForm" style="max-width: 400px">
      <div class="parting-line"></div>
      <el-form-item label="图层名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称" />
      </el-form-item>
      <div class="parting-line"></div>
      <el-form-item class="flex-container">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>  
import { useDialogStore } from '@/stores/dialog.js';
import { useLayerStore } from '@/stores/layer.js';
import { storeToRefs } from 'pinia';
import { reactive, ref } from 'vue';
import { reLayerName } from '@/api/api';
defineOptions({
  name: 'ReNameInfo',
});
const props = defineProps({
  layerId: {
    type: Number,
    required: true,
  },
});
const ruleFormRef = ref();
const dialogStore = useDialogStore();
const rules = reactive({
  name: [
    { required: true, message: '请输入图层名称', trigger: 'blur' },
  ],
});
const form = reactive({
  name: '',
});
const { reNameDialog, reNameId } = storeToRefs(dialogStore);
const { closeReNameDialog } = dialogStore;
const layerStore = useLayerStore();
const { changeLayerName } = layerStore;
const onCancel = () => {
  closeReNameDialog();
};
const onSubmit = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      closeReNameDialog();
      changeLayerName(form.name, reNameId.value);
      await reLayerName({ name: form.name, id: reNameId.value });
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
.parting-line {
  width: 100%; /* 线条长度 */
  height: 1px; /* 线条粗细 */
  background-color: lightgrey; /* 线条颜色 */
}
.el-form-item {
  margin-top: 15px;
}
.flex-container {
  position: relative;
  left: 140px;
}
.el-button {
  border-radius: 7px;
}
</style>