<template>
    <div class="leftSlide" :style="{ 'width': hideLeft ? '0%' : '40%' }" v-bind="$attrs">
      <div class="content" v-if="!hideLeft">
        <slot></slot>
      </div>
    </div>
    <div class="arrow-icon" :class="{left: !hideLeft}">
      <el-icon :size="20" :class="{ rotate: !hideLeft }" @click="toggleRotation">
        <DArrowRight />
      </el-icon>
    </div>

</template>

<script setup>
import { DArrowRight } from '@element-plus/icons-vue';
const props = defineProps({
  hideLeft: Boolean,
});
const emit = defineEmits(['toggleRotation']);
const toggleRotation = () => {
  emit('toggleRotation');
}
</script>

<style scoped>

.leftSlide {
  position: relative;
  height: 100%;
  transition: width 0.3s ease;
  overflow: hidden;
}

.arrow-icon {
  position: absolute;
  left: 0px;
  top: calc(50% - 40px);
  background-color: black;
  border-radius: 0 50% 50% 0; 
  z-index: 1000;
}

.el-icon {
  transition: transform 0.3s ease;
  color: white;
}
.left {
  left: 28.57143%;
}
.rotate {
  transform: rotate(180deg);
}
.content {
  height: 100%;
}
</style>