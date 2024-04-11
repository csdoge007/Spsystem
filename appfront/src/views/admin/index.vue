<template>
  <el-container>
    <el-aside>
      <Navigator></Navigator>
    </el-aside>

    <el-container>
      <el-header>Header</el-header>
      <el-main>
        <router-view v-slot="{ Component }"> 
          <keep-alive>
            <component :is="Component" />
          </keep-alive>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Navigator from '@/components/Navigator.vue';
export default {
  name: 'Admin',
  components: {
    Navigator
  }
}
</script>

<style lang="scss" scoped>
.el-aside {
  background-color: #242E42;
  width: 200px;
}
.el-main {
  padding: 0;
}
</style>