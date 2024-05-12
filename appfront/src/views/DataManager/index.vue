<template>
  <div class="manager">
    <!-- <div class="search"></div> -->
    <div class="table">
      <!-- <el-button type="primary">上传数据</el-button> -->
      <el-button @click="updateData" type="primary">同步数据</el-button>
      <DataTable class="data-table"></DataTable>
      <div class="pagination">
        <div class="total">共{{ total }}条</div>
        <el-select v-model="itemQuantityStr" size="middle" style="width: 100px; margin-left:10px;">
          <el-option
            v-for="quantity in quantities"
            :key="quantity"
            :label="quantity"
            :value="quantity">
          </el-option>
        </el-select> 
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="itemQuantity"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="slot, slot, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue';
import DataTable from '@/components/DataTable/index.vue';
import { useDialogStore } from '@/stores/dialog';
import { useManagerStore } from '@/stores/layer';
import { storeToRefs } from 'pinia';
defineOptions({
  name: 'DataManager',
});
const managerStore = useManagerStore();
const { getTableData, getstotal } = managerStore;
const { total } = storeToRefs(managerStore);
const dialogStore = useDialogStore();
const { openUpdateDialog } = dialogStore;
const currentPage = ref(1);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);
const itemQuantityStr = ref('10条/页');
const quantities = ['10条/页','20条/页','30条/页','40条/页','50条/页'];
const itemQuantity = computed(() => Number(itemQuantityStr.value.slice(0, 2)));
const handleCurrentChange = async (val) => {
  await getTableData({
    currentPage: currentPage.value,
    itemQuantity: itemQuantity.value,
  });
}
watch(itemQuantity, async (newVal, oldVal) => {
  currentPage.value = Math.floor(oldVal  * (currentPage.value - 1) / newVal) + 1;
  await getTableData({
    currentPage: currentPage.value,
    itemQuantity: itemQuantity.value,
  });
});
const updateData = () => {
  openUpdateDialog();
};
onMounted(async () => {
  await getstotal();
  await getTableData({
    currentPage: currentPage.value,
    itemQuantity: itemQuantity.value,
  });
});
</script>

<style lang="scss" scoped>
.manager {
  border-top: 1px solid rgb(211,211,211);
  background-color: rgb(246,246,246);
  height: 100%;
  /*.search {
    background-color: white;
    height: 15%;
  }*/
  .table {
    margin: 50px 25px auto 25px;
    background-color: white;
    border-radius: 10px;
    padding: 10px;
    position: relative;
    .data-table {
      margin-top: 10px;
    }
    .pagination {
      display: flex;
      align-items: center;
      color: rgb(96,98,102);
      justify-content: right;
      margin-top: 5px;
    }
  }
}
</style>