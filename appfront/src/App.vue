<script setup>
// import HelloWorld from './components/HelloWorld.vue'
import Map from './components/Map.vue';
import Navigator from './components/Navigator.vue';
// import Header from './components/Header.vue';
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
</style>
