<template>
  <el-row class="tac">
    <el-col>
      <h1 class="name">商选易达</h1>
      <el-menu
        background-color="#242E42"
        class="el-menu-vertical-demo"
        text-color="#fff"
        @open="handleOpen"
        @close="handleClose"
        default-active="2-2"
        unique-opened
      >
        <el-menu-item index="1">
          <template #title>
            <el-icon><Edit /></el-icon>
            <span>企业制图</span>
          </template>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><location /></el-icon>
            <span>智能选址</span>
          </template>
          <el-menu-item index="2-1">数据管理</el-menu-item>
          <el-menu-item index="2-2">选址规划</el-menu-item>
          <el-menu-item index="2-3">我的收藏</el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>基础管理</span>
          </template>
          <el-menu-item index="3-1">基础信息</el-menu-item>
          <el-menu-item index="3-2">账户管理</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script  setup>
import {
  Location,
  Edit,
  Setting
} from '@element-plus/icons-vue'
const handleOpen = (key, keyPath) => {
  console.log(key, keyPath)
}
const handleClose = (key, keyPath) => {
  console.log(key, keyPath)
}

</script>
<style scoped>
.name {
  display: flex;
  color:#fff;
  font-size: 1.5em;
  justify-content: center;
}
</style>