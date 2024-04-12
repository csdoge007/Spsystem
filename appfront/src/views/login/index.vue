<template>
  <div class="select-none">
    <img :src="bg" class="wave" />
    <div class="login-container">
      <div class="login-box">
        <el-icon size="75"><LocationFilled /></el-icon>
        <h2 class="outline-none">商选易达</h2>
        <div class="login-form">
          <el-form ref="ruleFormRef" :model="ruleForm" :rules="loginRules" size="large">
            <el-form-item :rules="[
            {
              required: true,
              message: '请输入账号',
              trigger: 'blur'
            }
          ]" prop="account">
              <el-input v-model="ruleForm.account" clearable placeholder="账号" autocomplete="new-password" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="ruleForm.password" clearable show-password placeholder="密码"
                autocomplete="new-password" @focus="clearError"/>
              <span v-if="showError" style="color: red;">密码错误，请重新输入</span>
            </el-form-item>
            <el-button class="w-full mt-4" size="default" type="primary" :loading="loading"
              @click="onLogin(ruleFormRef)">
              登录
            </el-button>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LocationFilled } from '@element-plus/icons-vue'
import { loginRules } from "./utils/rule";
import { ref, reactive } from "vue";
import { bg } from "./utils/static.js";
import { login } from '@/api/api.js';
import { useRouter } from 'vue-router';
const router = useRouter();
const showError = ref(false);
defineOptions({
  name: "Login"
});
const loading = ref(false);
const ruleFormRef = ref();
const ruleForm = reactive({
  account: "",
  password: ""
});
const clearError = () => {
  showError.value = false;
};
const onLogin = async (formEl) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      const { account, password } = ruleForm;
      try {
        const res = await login({account, password});
        loading.value = false;
        localStorage.setItem('token', res.data.data);
        router.push({
          name: 'Select',
          params: {
            id: account,
          }
        });
      } catch (error) {
        loading.value = false;
        showError.value = true;
        console.error(error);
      }
    } else {
      loading.value = false;
      return fields;
    }
  });
};


</script>

<style scoped>
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.login-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .login-box {

    /* 1/3宽度 */
    margin-right: 300px;
    /* 推到右侧 */
    /* 添加其他样式 */
    .outline-none {
      position: relative;
      top: -130px;
      right: -220px;
      color: rgb(153,153,153);
    }
    .el-icon {
      position: relative;
      top: -200px;
      right: -305px;
    }
  }
}
</style>
