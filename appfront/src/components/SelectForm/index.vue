<template>
  <div class="selectForm" >
    <el-form ref="ruleFormRef" :rules="rules" :model="form" label-width="100px" class="demo-ruleForm">
      <el-row>
        <el-col :span= "7">
          <el-form-item label="选址范围" prop="layer">
            <el-select v-model="form.layer" placeholder="请选择选址范围" size="small">
              <el-option
                v-for="layer in layers"
                :key="layer.name"
                :label="layer.name"
                :value="layer.name">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span= "7">
          <el-form-item label="网点类别" prop="type">
            <el-select v-model="form.type" placeholder="请选择网点类别" size="small">
              <el-option
                v-for="(type, idx) in types"
                :key="idx"
                :label="type"
                :value="type">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10" class="btn">
          <el-form-item label="搜索半径" prop="radius">
            <el-input-number
              v-model="form.radius"
              class="mx-4"
              :min="0"
              :max="8"
              :precision="2" 
              :step="0.1"
              size="small"
              controls-position="right"
            />
            <span>千米</span>
            <el-button type="primary"  @click="onSubmit(ruleFormRef)" :loading="loading">开始评估</el-button>
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
const { closePopup } = selectStore;
const ruleFormRef = ref();
defineOptions({
  name: 'SelectForm'
});
const emit = defineEmits(['toLeft']);
const loading = ref(false);
const types = ref(["摩托车服务","购物服务","道路附属设施","通行设施","医疗保健服务","住宿服务","地名地址信息","汽车销售","风景名胜","汽车服务","餐饮服务","公共设施","交通设施服务","生活服务","金融保险服务","体育休闲服务","商务住宅","事件活动","室内设施","汽车维修","公司企业","政府机构及社会团体","科教文化服务"]);
const props = defineProps({
  layers: Array,
})
const rules = reactive({
  layer: [
    { required: true, message: '请选择选址范围', trigger: 'blur' },
  ],
  radius: [
    { required: true, message: '请输入搜索半径', trigger: 'blur' },
  ],
  type: [
    { required: true, message: '请选择网点类别', trigger: 'blur' },
  ]
})
const form = reactive({
  layer: '',
  radius: 0,
  type: '',
})
const onSubmit = async (formEl) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      console.log('submit!');
      const result = await getAccessibility({...form,radius: form.radius * 1000, type: form.type});
      console.log(typeof form.radius);
      loading.value = false;
      console.log(result);
      selectStore.importSelectedPoints(result.data.accessibility);
      emit('toLeft');
      closePopup();
    } else {
      loading.value = false;
      console.log('error submit!', fields)
    }
  })
}
</script>

<style scoped>
.selectForm {
  width:750px;
  height: 37px;
  position: absolute;
  left: 50%; 
  top: 120px; 
  transform: translate(-50%, 0);
  z-index: 1000;
  background-color: white;
  padding: 10px;
  border-radius: 15px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.el-button {
  width: 80px;
  position: relative;
  left: 10px;
}
.el-input-number {
  width: 100px;
}
.el-button {
  border-radius: 5px;
}
</style>