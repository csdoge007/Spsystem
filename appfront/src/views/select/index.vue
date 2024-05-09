<template>
  <div class="select">
    <LeftSlide class="leftslide" :hideLeft="isHidden" @toggleRotation="toggleRotation">
      <SelectPanel></SelectPanel>
    </LeftSlide>
    <div class="map-form">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-change="changeTab">
        <el-tab-pane label="点位评估" name="evaluate">
        </el-tab-pane>
        <el-tab-pane label="智能推荐" name="recommended">
        </el-tab-pane>
      </el-tabs>
      <Map :isEdit="false" class="map" :isrecommended="activeName==='recommended'"></Map>
      <SelectForm :layers="layers" @toLeft="toLeft" :class="{ left: !isHidden }" v-if="activeName==='evaluate'"></SelectForm>
      <RecommendForm :layers="layers" @toLeft="toLeft" :class="{ left: !isHidden }" v-if="activeName==='recommended'"></RecommendForm>
    </div>
  </div>
</template>

<script setup>
import Map from '@/components/Map/index.vue';
import LeftSlide from '@/components/LeftSlide.vue';
import SelectForm from '@/components/SelectForm/index.vue';
import RecommendForm from '@/components/SelectForm/components/RecommendForm.vue';
import SelectPanel from '@/components/SelectPanel/index.vue';
import { onMounted, ref } from 'vue';
import { useSelectStore } from '@/stores/select';
import { storeToRefs } from 'pinia';
defineOptions({
  name: 'Select'
})
const selectStore = useSelectStore();
const { fetchLayers } = selectStore;
const { layers } = storeToRefs(selectStore);
const isHidden = ref(true);
const toggleRotation = () => {
  isHidden.value = !isHidden.value;
};
const toLeft = () => {
  isHidden.value = false;
};
const changeTab = () => {
  console.log('change');

}
const activeName = ref('evaluate');
onMounted(async () => {
  await fetchLayers();
});
</script>
<style scoped>
.select {
  position: relative;
  display: flex;
  height: 100%;
  margin: 0;
}
.map-form {
  position: relative; 
  height: 100%;
  width:100%;
  display: flex;
  flex-direction: column; 
}
.left {
  position: absolute;
  left: 40px;
  transform: translate(0,0);
}
:deep(.el-tabs__header) {
  margin-bottom: 0;
  padding-left: 10px;
}
.el-tabs {
  height: 40px;
  position: relative;
}
.map {
  flex-grow: 1;
}
</style>