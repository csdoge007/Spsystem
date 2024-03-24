<template>
  <div class="info">
    <el-form ref="ruleFormRef" :rules="rules" :model="form" label-width="100px" style="max-width: 600px" class="demo-ruleForm">
    <el-row>
      <el-col :span="12">
        <el-form-item label="加入图层" prop="layer">
          <el-select v-model="form.layer" placeholder="请选择目标图层">
            <el-option
              v-for="option in layers"
              :key="option.value"
              :label="option.label"
              :value="option.value">
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
        <el-form-item label="描述">
          <el-input v-model="form.description" />
        </el-form-item>
      </el-col>
      <el-col :span="12">
        <el-form-item label="详细地址">
          <el-input v-model="form.address" />
        </el-form-item>
      </el-col>
    </el-row>

    <el-form-item class="flex-container">
      <el-button>取消</el-button>
      <el-button type="primary" @click="onSubmit(ruleFormRef)">保存</el-button>
    </el-form-item>
  </el-form>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue';
defineOptions({
  name: 'InfoSubmission'
})
// import { loginRules } from "./utils/rule";
const props = defineProps({
  layers: Array,
})

const ruleFormRef = ref();
const rules = reactive({
  layer: [
    { required: true, message: '请选择目标图层', trigger: 'blur' },
  ],
  title: [
    { required: true, message: '网点名称不能为空', trigger: 'blur' },
  ]
})
const selectedOption = ref(null);


const form = reactive({
  layer: '',
  title: '',
  description: '',
  address: '',
})
watch(() => props.options, () => {
  form.layer = props.options
}, {
  immediate: true
});

const onSubmit = async (formEl) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!', fields)
    }
  })
}
</script>
<style scoped>
.flex-container {
  position: relative;
  left: 365px;
}
.info {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
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