<template>
  <div class="selectForm" >
    <el-form ref="ruleFormRef" :rules="rules" :model="form" label-width="100px" style="max-width: 600px" class="demo-ruleForm">
      <el-row>
        <el-col :span="10">
          <el-form-item label="选址范围" prop="layer">
            <el-select v-model="form.layer" placeholder="请选择选址范围" size="small">
              <el-option
                v-for="option in layers"
                :key="option.value"
                :label="option.label"
                :value="option.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="搜索半径" prop="radius">
            <el-input-number
              v-model="form.radius"
              class="mx-4"
              :min="0"
              :max="100"
              :precision="2" 
              :step="0.1"
              size="small"
              controls-position="right"
              @change="handleChange"
            />
            <span>千米</span>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="onSubmit(ruleFormRef)" :loading="loading">开始评估</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { getAccessibility } from '@/api/api';
import { useSelectStore } from '@/stores/select';
const selectStore = useSelectStore();
const ruleFormRef = ref();
defineOptions({
  name: 'SelectForm'
});
const emit = defineEmits(['toLeft']);
const loading = ref(false);
const props = defineProps({
  layers: Array,
})
const rules = reactive({
  layer: [
    { required: true, message: '请选择选址范围', trigger: 'blur' },
  ],
  radius: [
    { required: true, message: '请输入搜索半径', trigger: 'blur' },
  ]
})
const form = reactive({
  layer: '',
  radius: 0,
})
const onSubmit = async (formEl) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!');
      const result = await getAccessibility({...form,radius: form.radius * 1000});
      loading.value = false;
      console.log(result);
      selectStore.importSelectedPoints(result.data.accessibility);
      emit('toLeft');
    } else {
      loading.value = false;
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
.selectForm {
  width:700px;
  height: 37px;
  position: absolute;
  left: 45%; 
  top: 22%; 
  transform: translate(-50%, calc(-100% - 50px));
  z-index: 1000;
  background-color: white;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>