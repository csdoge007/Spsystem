<template>
  <InfoSubmission :layers="layers" ></InfoSubmission>
  <Map :isEdit="true"></Map>
</template>

<script setup>
import InfoSubmission from '@/components/InfoSubmission/index.vue';
import Map from '@/components/Map/index.vue';
import { ref } from 'vue';
defineOptions({
  name: 'Edit'
})
const layers = ref([
      { label: '选项1', value: 'option1' },
      { label: '选项2', value: 'option2' },
      { label: '选项3', value: 'option3' },
    ]); // 选项数组
</script>

<style scoped>

</style>