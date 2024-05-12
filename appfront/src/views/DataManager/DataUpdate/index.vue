<template>
 <el-dialog
    width="400"
    v-model="updateDialog"
    >
    <template #header="{ titleId, titleClass }">
      <span :id="titleId" :class="titleClass" style="font-weight: bold; font-size: 15px;">
        同步数据
      </span>
    </template>
    <div class="parting-line"></div>
    <div class="select-all">
      <el-checkbox v-model="checkedAll" label="全选" size="large" @change="onChangeAll"/>
    </div>
    <div class="select-box">
      <el-scrollbar>
      <div class="select-content">
        <div class="select-column" v-for="(data,index) in simulateData">
          <el-checkbox v-for= "(item,idx) in data" v-model="simulateData[index][idx].selected" :label="simulateData[index][idx].name" size="large"/>
        </div>
      </div>
      </el-scrollbar> 
    </div>
    <div class="parting-line"></div>
    <el-form-item class="flex-container">
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onConfirm">确定</el-button>
    </el-form-item>
  </el-dialog>

</template>

<script setup>
import { useDialogStore } from '@/stores/dialog';
import { useManagerStore } from '@/stores/layer';
import { storeToRefs } from 'pinia';
import { ref, onMounted } from 'vue';
import { getEditData, updateLayerData } from '@/api/api';
defineOptions({
  name: 'DataUpdate',
});
const managerStore = useManagerStore();
const dialogStore = useDialogStore();
const { updateDialog } = storeToRefs(dialogStore);
const { closeUpdateDialog } = dialogStore;
const checkedAll = ref(false);
// const simulateData = ref([
//   [false,false,false,false],
//   [false,false,false,false],
//   [false,false,false,false],
//   [false,false,false,false],
//   [false,false,false,false],
//   [false,false,false,false],
//   [false,false,false,false],
//   [false,false,false,false],
//   [false,false,false,false],
//   [false,false,false,false],
//   [false,false,false,false],
//   [false,false,false,false],
//   [false,false,false,false],
//   [false,false,false,false],
//   [false,false,false],
// ]);
const simulateData = ref([]);
const onChangeAll = (value) => {
  if (value) {
    simulateData.value.forEach((data, idx) => {
      data.forEach((_, index) => {
        simulateData.value[idx][index].selected = true;
      });
    });
  } else {
    simulateData.value.forEach((data, idx) => {
      data.forEach((_, index) => {
        simulateData.value[idx][index].selected = false;
      });
    });
  }
};
const onCancel = () => {
  closeUpdateDialog();
};
const onConfirm = async () => {
  const data = simulateData.value.reduce((prev, cur) => {
    const arr = cur.filter(val => val.selected);
    return [...prev, ...arr];
  },[]);
  await updateLayerData(data);
  await managerStore.getTableData();
  await managerStore.getstotal();
  closeUpdateDialog();
};
onMounted(async () => {
  const data = await getEditData();
  simulateData.value = data.data;
});
</script>

<style lang="scss" scoped>
.parting-line {
  width: 100%; /* 线条长度 */
  height: 1px; /* 线条粗细 */
  background-color: lightgrey; /* 线条颜色 */
}
.select-all {
    height: 50px;
}
.select-box {
  height: 200px;
  .select-content {
    display: flex;
    .select-column {
      display: flex;
      flex-direction: column;
    }
  }
}
.flex-container {
  margin-top: 20px;
  position: relative;
  left: 240px;
}
</style>