<template>
  <el-dialog
    width="400"
    v-model="layerDialog"
    >
    <template #header="{ titleId, titleClass }">
      <h7 :id="titleId" :class="titleClass" style="font-weight: bold;">
        新建图层
      </h7>
    </template>
    <div class="parting-line"></div>
    <span class="text">请选择图层类型</span>
    <div class="select">
      <div class="point option" 
        @click="handleClick"
        :class="{actived: activeSign.point}">
        <div class="quarter-circle" v-if="activeSign.point"></div>
        <svg style="margin-top: -10px;" t="1712919064810" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4425" width="55" height="55"><path d="M517.688889 315.983644c-46.057244 0-82.898489 37.535289-82.898489 82.6368 0 44.532622 38.286222 82.6368 82.898489 82.6368 46.057244 0 82.898489-37.523911 82.898489-82.6368 0-45.966222-37.694578-82.6368-82.898489-82.6368z m0 45.511112c20.343467 0 37.387378 16.577422 37.387378 37.125688 0 20.161422-16.657067 37.125689-37.387378 37.125689-19.524267 0-37.387378-17.772089-37.387378-37.125689 0-20.161422 16.657067-37.125689 37.387378-37.125688z" fill="#7FD1F6" p-id="4426"></path><path d="M517.688889 216.177778c-100.260978 0-181.202489 80.668444-183.125333 182.1696 0 28.9792 6.314667 60.472889 17.601422 82.978133l2.525866 5.040356 2.810312 5.313422 3.072 5.597867 3.367822 5.870933 3.640889 6.144 3.925333 6.439822 4.1984 6.712889 6.815289 10.581333 7.452444 11.207111 5.313423 7.827912 5.597866 8.112355 5.870934 8.3968 9.329777 13.118578 6.587734 9.102222 6.8608 9.375289 10.808889 14.609067 7.566222 10.092089 11.867022 15.678577 8.271644 10.808889 12.925156 16.759467a45.511111 45.511111 0 0 0 9.363911 9.033955l2.002489 1.365334a45.488356 45.488356 0 0 0 41.665422 3.8912l1.615645-0.694045 4.972089 3.584 21.663288-30.196622 15.985778-22.471111 11.320889-16.088178 14.222222-20.400355 13.198223-19.228445 12.1856-18.045155 8.476444-12.754489 7.918933-12.105956 7.350045-11.434666 6.781155-10.774756 4.209778-6.826667 5.8368-9.671111 3.584-6.098489 3.333689-5.802666 3.072-5.506845 1.456356-2.639644c13.9264-25.8048 19.626667-48.082489 19.626666-78.165334 0-99.828622-82.545778-180.906667-183.125333-180.906666z m0 45.511111c75.628089 0 137.614222 60.893867 137.614222 135.395555 0 22.482489-3.800178 37.341867-14.142578 56.502045l-2.844444 5.131378-3.128889 5.518222-3.401956 5.8368-5.597866 9.341155-6.200889 10.057956-6.792533 10.752-7.395556 11.4688-7.998578 12.174222-11.593955 17.328356-9.386667 13.812622-6.587733 9.602844-10.376534 14.984534-14.768355 21.071644-15.815111 22.311822-8.146489 11.400534-4.187022 5.8368-12.310756-15.951645-11.719111-15.337244-11.116089-14.734222-10.524444-14.108445-9.921423-13.5168-6.280533-8.647111-8.920178-12.4928-8.328533-11.855644-7.714133-11.241245-4.8128-7.145244-4.551112-6.872178-4.266666-6.599111-4.016356-6.303289-3.731911-6.0416-3.470222-5.757156-3.208533-5.484088-2.924089-5.199645-2.673778-4.9152-2.389333-4.642133a208.440889 208.440889 0 0 1-1.092267-2.218667c-7.964444-15.860622-12.891022-40.459378-12.891022-62.372978C381.519644 322.3552 442.368 261.688889 517.688889 261.688889z" fill="#00A3EB" p-id="4427"></path><path d="M327.168 822.567822a37.944889 37.944889 0 0 1-34.315378-13.915022c-8.100978-10.160356-10.672356-23.290311-6.269155-35.805867l0.910222-2.343822 56.7296-131.390578a22.755556 22.755556 0 0 1 42.427733 16.384l-0.648533 1.661156-51.052089 118.203733 13.141333-1.956978c14.631822-2.1504 28.922311-4.152889 43.394845-6.030222 16.099556-2.116267 31.584711-3.959467 46.307555-5.518222l12.196978-1.2288 11.6736-1.069511 11.150222-0.910222 10.604089-0.728178 10.046578-0.568889 9.466311-0.364089 8.874667-0.193422 4.221155-0.022756c11.776 0 25.281422 0.568889 40.334223 1.6384l11.582577 0.898845 6.007467 0.523378 12.424533 1.171911 6.417067 0.648533c15.303111 1.592889 31.402667 3.515733 48.162133 5.711644 9.602844 1.262933 19.091911 2.571378 28.683378 3.936712l31.095467 4.608-51.279645-118.749867a22.755556 22.755556 0 0 1 10.262756-29.149867l1.604267-0.762311a22.755556 22.755556 0 0 1 29.149866 10.262756l0.762311 1.604266 56.558934 131.003734 0.3072 0.6144c5.984711 13.255111 2.298311 28.865422-8.567467 39.139555l-1.240178 1.103645-1.319822 1.342577a40.004267 40.004267 0 0 1-31.357156 10.365156l-28.16-4.243911c-14.358756-2.127644-28.296533-4.096-42.416355-5.950578-16.384-2.1504-32.085333-4.016356-46.956089-5.575111l-11.298133-1.115022-5.461334-0.512-10.569955-0.910222-10.046578-0.739556c-3.254044-0.227556-6.428444-0.420978-9.511822-0.591644l-8.965689-0.420978c-1.444978-0.056889-2.8672-0.113778-4.266667-0.147911l-8.100978-0.170667a343.711289 343.711289 0 0 0-20.1728 0.341333l-9.102222 0.432356-4.778666 0.295822-9.978312 0.682667-5.211022 0.420978-10.820266 0.932977c-3.697778 0.341333-7.486578 0.705422-11.355023 1.103645l-5.870933 0.603022c-14.336 1.513244-29.445689 3.322311-45.192533 5.381689-9.466311 1.2288-18.887111 2.514489-28.3648 3.868444l-41.847467 6.200889z" fill="#00A3EB" p-id="4428"></path></svg>
        <span style="margin-top: -10px;">网点</span>
      </div>
      <div class="surface option" 
        @click="handleClick"
        :class="{actived: activeSign.surface}">
        <div class="quarter-circle" v-if="activeSign.surface"></div>
        <svg style="margin-right: -5px;" t="1712920140529" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="9651" width="35" height="35"><path d="M51.2 351.744L596.48 972.8H102.4a51.2 51.2 0 0 1-51.2-51.2z m845.824 69.12V921.6a51.2 51.2 0 0 1-51.2 51.2h-165.376l-171.52-195.584z m-426.496 145.408l78.848 87.552-82.432 75.776-78.336-89.6z m375.296-439.296a51.2 51.2 0 0 1 51.2 51.2v156.16l-300.544 276.48-120.832-134.144-128.512 115.712L51.2 256V178.176a51.2 51.2 0 0 1 51.2-51.2h275.968a226.816 226.816 0 0 0-5.12 46.08c0 69.632 58.368 174.592 175.616 315.904l13.312 15.872a51.2 51.2 0 0 0 71.68 5.632 22.016 22.016 0 0 0 6.144-5.632q188.928-223.232 188.928-331.776a195.584 195.584 0 0 0-5.632-46.08z" fill="#FF0000" p-id="9652"></path><path d="M601.088 0A168.96 168.96 0 0 1 768 168.96q0 82.432-128.512 246.272a51.2 51.2 0 0 1-8.704 9.216A51.2 51.2 0 0 1 563.2 415.232l-10.752-13.824q-118.272-153.6-118.272-232.448A169.472 169.472 0 0 1 601.088 0z m0 84.48a84.992 84.992 0 1 0 84.48 84.48 84.48 84.48 0 0 0-84.48-84.48z" fill="#FF0000" p-id="9653"></path></svg>
        <span>区划</span>
      </div>
      <div class="line option" 
        @click="handleClick"
        :class="{actived: activeSign.line}">
        <div class="quarter-circle" v-if="activeSign.line"></div>
        <svg style="margin-bottom: -5px;" t="1712921790083" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10666" width="35" height="35"><path d="M893.60324 640c-54.7 1-101.1 36.4-118.4 85.4-2.2 6.4-8.3 10.6-15 10.6h-551c-52.8 0-96.7-42.2-97.2-95-0.5-53.4 42.7-97 96-97h576c42.5 0 82.6-16.7 113-47 30.3-30.3 47-70.4 47-113s-16.7-82.6-47-113c-30.3-30.3-70.5-47-113-47H263.80324c-6.7 0-12.8-4.2-15-10.6-17.3-49.1-63.6-84.4-118.4-85.4C59.90324 126.7 0.50324 184.6 0.00324 255.1-0.49676 326.2 57.00324 384 128.00324 384c55.7 0 103.1-35.6 120.7-85.3 2.3-6.4 8.3-10.7 15.1-10.7h519c52.8 0 96.7 42.2 97.2 95 0.5 53.4-42.7 97-96 97H208.00324c-42.5 0-82.6 16.7-113 47-30.3 30.3-47 70.5-47 113s16.7 82.6 47 113c30.3 30.3 70.5 47 113 47h552.2c6.8 0 12.8 4.3 15.1 10.7 17.6 49.7 65 85.3 120.7 85.3 71 0 128.5-57.8 128-128.9-0.5-70.5-59.9-128.4-130.4-127.1zM128.00324 320c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z m768 512c-35.3 0-64-28.7-64-64s28.7-64 64-64 64 28.7 64 64-28.7 64-64 64z" p-id="10667" fill="#00FF00"></path></svg>
        <span>线路</span>
      </div>
    </div>
    <el-form ref="ruleFormRef" :rules="rules" :model="form" label-width="100px" class="demo-ruleForm" style="max-width: 400px">
      <el-form-item label="图层名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="所属分组" prop="group">
        <el-select v-model="form.group" placeholder="请选择所属分组">
          <el-option 
            v-for="group in groups"
            :key="group"
            :label="group"
            :value="group">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="flex-container">
        <el-button @click="onCancel">取消</el-button>
        <el-button type="primary" @click="onSubmit(ruleFormRef)" :loading="loading">保存</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>  
import { ref, reactive, computed, onMounted } from 'vue';
import { getGroups, addLayer } from '@/api/api';
import { ElMessage } from 'element-plus';
defineOptions({
  name: 'LayerInfo'
})
import { storeToRefs } from 'pinia';
import { useDialogStore } from '@/stores/dialog.js';
import { useLayerStore } from '@/stores/layer.js';
const dialogStore = useDialogStore();
const layerStore = useLayerStore();
const { layerDialog } = storeToRefs(dialogStore);
const { closeLayerDialog } = dialogStore;
const { fetchLayers } = layerStore;
const ruleFormRef = ref();
const loading = ref(false);
const rules = reactive({
  name: [
    { required: true, message: '请选择目标图层', trigger: 'blur' },
  ],
})
const form = reactive({
  name: '',
  group: '',
});
const activeSign = reactive({
  point: false,
  surface: false,
  line: false,
});
const type = computed(() => {
  const typeArr = Object.keys(activeSign).filter(item => activeSign[item])
  return typeArr.length > 0 ? typeArr[0] : 'temp';
});
const onCancel = () => {
  closeLayerDialog();
}
const onSubmit = async (formEl) => {
  if (!formEl) return;
  if (type.value === 'temp') {
    ElMessage({
      message: '请选择图层类型',
      type: 'warning',
    });
    return;
  }
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const layerInfo = {
        type: type.value,
        name: form.name,
        quantity: 0,
        group_name: form.group,
        isviewed: true,
      };
      await addLayer(layerInfo);
      closeLayerDialog();
      fetchLayers();
    } else {
      console.log('error submit!', fields)
    }
  })
}
const handleClick = (event) => {
  const className = event.currentTarget.classList[0];
  if (className in activeSign) {
    Object.keys(activeSign).forEach((key) => {
      activeSign[key] = false;
    });
    activeSign[className] = true;
  }
};
const groups = ref([]);
onMounted(async () => {
  groups.value = await getGroups().then(res => res.data);
});
</script>

<style scoped>
.quarter-circle {
  position: absolute;
  top: 0px;
  right: 0px;
  width: 15px;
  height: 15px;
  background-color: blue; 
  border-radius: 0 15px 0 10px; 
}
.quarter-circle::before {
  position: absolute;
  content: " ";
  width: 6px;
  height: 11px;
  transform: rotate(45deg);
  border-right: 2px solid #fff;
  border-bottom: 2px solid #fff;
  left: 5px;
}
.actived {
  border: solid 2px blue;
}
.point:hover {
  border: solid 2px blue;
  cursor: pointer;
}
.surface:hover {
  border: solid 2px blue;
  cursor: pointer;
}
.line:hover {
  border: solid 2px blue;
  cursor: pointer;
}
.el-button {
  border-radius: 7px;
}
.flex-container {
  position: relative;
  left: 150px;
}
.parting-line {
  width: 100%; /* 线条长度 */
  height: 1px; /* 线条粗细 */
  background-color: lightgrey; /* 线条颜色 */
}
.text {
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 10px;
}
.select {
  display: flex;
  height: 100px;
  justify-content: space-between;
}
.select .option {
  position: relative;
  height: 100px;
  width: 100px;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight:bold;
  flex-direction: column;
}
.point {
  background-color: rgba(0, 0, 255, 0.1); 
  color: rgba(0, 0, 255, 1); 
}
.surface {
  background-color: rgba(255, 0, 0, 0.1);
  color: rgba(255, 0, 0, 1.0); 
}
.line {
  background-color: rgba(0, 255, 0, 0.1);
  color: rgba(0, 255, 0, 1.0);
}
.el-form {
  margin-top: 15px;
  margin-left: -19px;
}
:deep(.el-input__wrapper) {
  border-radius: 10px;
}
:deep(.el-select__wrapper) {
  border-radius: 10px;
}
</style>