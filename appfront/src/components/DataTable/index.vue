<template>
  <el-scrollbar height="440px">
    <el-table :data="filteredData" style="width: 100%" @cell-click="onClick">
      <el-table-column prop="number" label="序号" width="180" />
      <el-table-column prop="name" label="数据名称" width="180" />
      <el-table-column prop="dataType" label="数据类型" width="180" />
      <el-table-column prop="quantity" label="数据量级" width="180" />
      <el-table-column prop="lastTime" label="最近更新时间" width="180" />
      <el-table-column prop="rankStatus" label="评分处理状态" width="180" />
      <el-table-column prop="operation" label="操作" width="180">
        
        <template #default>
          
            <el-button link type="primary" size="small">
              删除
            </el-button>
         
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script setup>
import { watch, ref } from 'vue'; 
import { useManagerStore } from '@/stores/layer';
import { storeToRefs } from 'pinia';
import { deleteNewLayer } from '@/api/api';
import { ElMessage } from 'element-plus';

defineOptions({
  name: 'DataTable',
});
const managerStore = useManagerStore();
const { currentPage, itemQuantity } = storeToRefs(managerStore);
const filteredData = ref([]);
watch(() => managerStore.tableData, (newVal) => {
  filteredData.value = newVal.map((item, idx) => {
    return {
      number: (currentPage.value - 1) * itemQuantity.value + idx + 1,
      name: item.name,
      dataType: item.type,
      quantity: item.quantity,
      lastTime: item.updatetime,
      rankStatus: item.status ? '处理成功' : '未处理',
    }
  });
});
const onClick = async (row, col, cell, event) => {
  if (col.id === "el-table_1_column_7" && event.target.tagName === 'SPAN') {
    await deleteNewLayer(row.name);
    await managerStore.getTableData();
    await managerStore.getstotal();
    ElMessage({
      message: '删除成功',
      type: 'success',
    });
  }
};
// const filteredProps = computed(() => {
//   return managerStore.tableData.map((item, idx) => {
//     return {
//       number: idx + 1,
//       name: item.name,
//       dataType: item.type,
//       quantity: item.quantity,
//       lastTime: item.updatetime,
//       rankStatus: item.status ? '处理成功' : '未处理',
//     }
//   });
// });

// const tableData = [
//   {
//     number: 1,
//     name: '高级餐厅',
//     dataType: '点数据',
//     quantity: 4,
//     lastTime: '2024-05-10',
//     rankStatus: '处理成功',
//     operation: '删除',
//   },
//   {
//     number: 1,
//     name: '高级餐厅',
//     dataType: '点数据',
//     quantity: 4,
//     lastTime: '2024-05-10',
//     rankStatus: '处理成功',
//     operation: '删除',
//   },
//   {
//     number: 1,
//     name: '高级餐厅',
//     dataType: '点数据',
//     quantity: 4,
//     lastTime: '2024-05-10',
//     rankStatus: '处理成功',
//     operation: '删除',
//   },
//   {
//     number: 1,
//     name: '高级餐厅',
//     dataType: '点数据',
//     quantity: 4,
//     lastTime: '2024-05-10',
//     rankStatus: '处理成功',
//     operation: '删除',
//   },
//   {
//     number: 1,
//     name: '高级餐厅',
//     dataType: '点数据',
//     quantity: 4,
//     lastTime: '2024-05-10',
//     rankStatus: '处理成功',
//     operation: '删除',
//   },
//   {
//     number: 1,
//     name: '高级餐厅',
//     dataType: '点数据',
//     quantity: 4,
//     lastTime: '2024-05-10',
//     rankStatus: '处理成功',
//     operation: '删除',
//   },
//   {
//     number: 1,
//     name: '高级餐厅',
//     dataType: '点数据',
//     quantity: 4,
//     lastTime: '2024-05-10',
//     rankStatus: '处理成功',
//     operation: '删除',
//   },
//   {
//     number: 1,
//     name: '高级餐厅',
//     dataType: '点数据',
//     quantity: 4,
//     lastTime: '2024-05-10',
//     rankStatus: '处理成功',
//     operation: '删除',
//   },{
//     number: 1,
//     name: '高级餐厅',
//     dataType: '点数据',
//     quantity: 4,
//     lastTime: '2024-05-10',
//     rankStatus: '处理成功',
//     operation: '删除',
//   },
//   {
//     number: 1,
//     name: '高级餐厅',
//     dataType: '点数据',
//     quantity: 4,
//     lastTime: '2024-05-10',
//     rankStatus: '处理成功',
//     operation: '删除',
//   },
//   {
//     number: 1,
//     name: '高级餐厅',
//     dataType: '点数据',
//     quantity: 4,
//     lastTime: '2024-05-10',
//     rankStatus: '处理成功',
//     operation: '删除',
//   },
//   {
//     number: 1,
//     name: '高级餐厅',
//     dataType: '点数据',
//     quantity: 4,
//     lastTime: '2024-05-10',
//     rankStatus: '处理成功',
//     operation: '删除',
//   },
//   {
//     number: 1,
//     name: '高级餐厅',
//     dataType: '点数据',
//     quantity: 4,
//     lastTime: '2024-05-10',
//     rankStatus: '处理成功',
//     operation: '删除',
//   },
//   {
//     number: 1,
//     name: '高级餐厅',
//     dataType: '点数据',
//     quantity: 4,
//     lastTime: '2024-05-10',
//     rankStatus: '处理成功',
//     operation: '删除',
//   },
// ]
</script>

<style lang="scss" scoped>
</style>