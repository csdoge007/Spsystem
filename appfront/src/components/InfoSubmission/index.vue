<template>
  <div class="info">
  <el-form ref="ruleFormRef" :rules="rules" :model="form" label-width="100px" style="max-width: 600px" class="demo-ruleForm">
    <el-row>
      <el-col :span="12">
        <el-form-item label="加入图层" prop="layer">
          <el-select v-model="form.layer" placeholder="请选择目标图层">
            <el-option
              v-for="layer in pointLayers"
              :key="layer.name"
              :label="layer.name"
              :value="layer.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="网点名称" prop="title">
          <el-input v-model="form.title" placeholder="请输入网点名称"/>
        </el-form-item>
      </el-col>
    </el-row>
    
    <el-row>
      <el-col :span="12">
        <el-form-item label="网点类别" prop="category">
          <el-select v-model="form.category" placeholder="请选择网点类别">
            <el-option
              v-for="category in categorys"
              :key="category"
              :label="category"
              :value="category">
            </el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="详细地址">
          <el-input v-model="form.address" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="12">
        <el-form-item label="描述">
          <el-input v-model="form.description" />
        </el-form-item>
      </el-col>
    </el-row>
    <el-form-item class="flex-container">
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onSubmit(ruleFormRef)">保存</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script setup>
import { usePointStore } from '@/stores/point';
import { useLayerStore } from '@/stores/layer';
import { reactive, ref, computed } from 'vue';
import { pointInfoSub } from '@/api/api';
import categorys from './static/index';
import { storeToRefs } from 'pinia';
const emit = defineEmits(['hide']);
const pointStore = usePointStore();
defineOptions({
  name: 'InfoSubmission'
})
// import { loginRules } from "./utils/rule";
const layerStore = useLayerStore();
const { layers } = storeToRefs(layerStore);
const pointLayers = computed(() => layers.value.filter((layer) => layer.type === 'point'));
const { fetchLayers } = layerStore;
const ruleFormRef = ref();
const rules = reactive({
  layer: [
    { required: true, message: '请选择目标图层', trigger: 'blur' },
  ],
  title: [
    { required: true, message: '网点名称不能为空', trigger: 'blur' },
  ],
  category: [
    { required: true, message: '网点类别不能为空', trigger: 'blur' },
  ]
})



const form = reactive({
  layer: '',
  title: '',
  description: '',
  address: '',
  category: '',
});
const onSubmit = async (formEl) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!');
      const { locationx, locationy } = pointStore.location;
      await pointInfoSub({...form, x: locationx, y: locationy });
      emit('hide');
      pointStore.edited();
      fetchLayers();
    } else {
      console.log('error submit!', fields)
    }
  })
}
const onCancel = () => {
  pointStore.clearEditingPoint();
  emit('hide');
}
</script>
<style scoped>
.flex-container {
  position: relative;
  left: 365px;
}
.info {
  width: 600px;
  height: 180px;
  position: absolute;
  transform: translate(-50%, calc(-100% - 50px));
  z-index: 1000;
  background-color: white;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
.info::before {
  content: '';
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color:white;
  position: absolute;
  left: 50%;
  top: 99%;
  transform: translate(-50%);
}
</style>