<template>
  <div class="login-form">
    <el-form size="large">
      <el-form-item>
        <el-input clearable placeholder="账号" :prefix-icon="User"/>
      </el-form-item>
      <el-form-item>
        <el-input clearable placeholder="用户名" :prefix-icon="UserFilled"/>
      </el-form-item>
      <el-form-item>
        <el-input clearable placeholder="密码" :prefix-icon="Lock"/>
      </el-form-item>
      <el-form-item>
        <el-input clearable placeholder="确认密码" :prefix-icon="Lock"/>
      </el-form-item>
      <el-form-item>
        <el-input clearable placeholder="公司码" :prefix-icon="OfficeBuilding"/>
      </el-form-item>
      <el-form-item>
        <el-button size="default" type="primary" :loading="loading">
          确定
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button size="default" @click="onBack">
          返回
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { User, UserFilled, Lock, OfficeBuilding } from '@element-plus/icons-vue';
import { useLoginStore } from '@/stores/user';
defineOptions({
  name: "LoginRegist",
});
const onBack = () => {
  useLoginStore().setCurrentPage(0);
};
</script>
<style scoped>
@import url("@/style/login.css");
</style>
<style scoped>
.el-button {
  width: 100%;
}
</style>