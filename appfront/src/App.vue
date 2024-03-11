<script setup>
import Map from './components/Map.vue';
import Navigator from './components/Navigator.vue';
// import Login from './views/login/index.vue';
</script>

<template>
  <div class="app">
    <el-container>
      <el-aside>
        <Navigator></Navigator>
      </el-aside>
      <el-container>
        <el-main>
          <Map></Map>
        </el-main>
      </el-container>
    </el-container>
    <!-- <Login></Login> -->
  </div>
</template>

<style scoped>
.app {
    height: 100%;
    display: flex;
}
.el-aside {
  background-color: #242E42;
  width: 200px;
}
.el-main {
  padding: 0;
}
</style>./views/login/index.vue
