<template>
  <div class="point-items">
    <div class="point-item" v-for="element in elements" :key="element.name">
      {{element.title}}
      <el-popconfirm
        confirm-button-text="确定"
        cancel-button-text="取消"
        :icon="InfoFilled"
        icon-color="#626AEF"
        title="你确定删除该点位吗?"
        @confirm="confirmEvent(element)"
        @cancel="cancelEvent"
      >
        <template #reference>
          <el-icon @click="triggerDelete" :class="{ active: isActived }"><Delete /></el-icon>
        </template>
      </el-popconfirm>
    </div>
  </div>
</template>
 
<script setup>
import { Delete } from '@element-plus/icons-vue';
import { InfoFilled } from '@element-plus/icons-vue';
import { ref } from 'vue';
import { deletePoint } from '@/api/api';
import { useLayerStore } from '@/stores/layer';
defineOptions({
  name: 'EditItemContent',
});
const props = defineProps({
  elements: {
    type: Array,
    required: true,
  },
});
const isActived = ref(false);
const confirmEvent = async (element) => {
  isActived.value = false;
  const { id, layer } = element;
  await deletePoint({ id, layer });
  useLayerStore().fetchLayers();
};
const cancelEvent = () => {
  isActived.value = false;
};
const triggerDelete = () => {
  isActived.value = true;
};
</script>

<style scoped>
.point-items {
  display: flex;
  flex-direction: column;
}
.point-item {
  height: 35px;
}
.point-item:hover .el-icon {
  opacity: 1;
}
.point-item:hover {
  cursor: pointer;
}
.el-icon {
  position: absolute;
  right: 20px;
  opacity: 0;
}
.active {
  opacity: 1;
}
</style>