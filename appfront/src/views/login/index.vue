<template>
  <div class="loginPage">
    <img :src="bg" class="wave" />
    <div class="login-container">
      <div class="login-box">
        <el-icon size="75"><LocationFilled /></el-icon>
        <h2 class="outline-none">商选易达</h2>
        <div class="login-form" v-if="currentPage === 0">
          <el-form ref="ruleFormRef" :model="ruleForm" :rules="loginRules" size="large">
            <el-form-item prop="account">
              <el-input v-model="ruleForm.account" clearable placeholder="账号" :prefix-icon="User"/>
            </el-form-item>
            <el-form-item prop="password">
              <el-input v-model="ruleForm.password" clearable show-password placeholder="密码"
                autocomplete="new-password" @focus="clearError" :prefix-icon="Lock"/>
              <span v-if="showError" style="color: red;">密码错误，请重新输入</span>
            </el-form-item>
            <el-form-item>
              <el-button class="login" size="default" type="primary" :loading="loading"
                @click="onLogin(ruleFormRef)">
              登录
              </el-button>
            </el-form-item>
            <el-form-item>
              <div class="login-bottom">
                <el-button>手机登录</el-button>
                <el-button>二维码登录</el-button>
                <el-button @click="regist">注册</el-button>
              </div>
            </el-form-item>
          </el-form>
        </div>
        <LoginRegist v-if="currentPage === 1"></LoginRegist>
      </div>
    </div>
  </div>
</template>

<script setup>
import { LocationFilled, User, Lock } from '@element-plus/icons-vue'
import { loginRules } from "./utils/rule";
import { ref, reactive } from "vue";
import { bg } from "./utils/static.js";
import { login } from '@/api/api.js';
import { useRouter } from 'vue-router';
import LoginRegist from './components/LoginRegist.vue';
import { useLoginStore } from '@/stores/user';
import { storeToRefs } from 'pinia';
defineOptions({
  name: "Login"
});
const router = useRouter();
const showError = ref(false);
const loginStore = useLoginStore();
const { currentPage } = storeToRefs(loginStore);
const loading = ref(false);
const ruleFormRef = ref();
const ruleForm = reactive({
  account: "",
  password: "",
});
const clearError = () => {
  showError.value = false;
};
const onLogin = async (formEl) => {
  if (!formEl) return;
  loading.value = true;
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
const regist = () => {
  currentPage.value = 1;
};

</script>

<style scoped>
@import url("@/style/login.css");
</style>

<style lang="scss" scoped>
.login-bottom {
  width: 100%;
  height: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;
}
.loginPage {
  width: 100%;
  height: 100%;
}
.el-button {
  width: 100%;
}
.login {
  width: 100%;
}
:deep(.el-input-group__append, .el-input-group__prepend) {
  padding: 0;
}

.login-container {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  .login-box {
    display: flex;
    flex-direction: column;
    /* 1/3宽度 */
    position: absolute;
    right: 200px;
    /* 推到右侧 */
    /* 添加其他样式 */
    // .outline-none {
    //   position: relative;
    //   top: -130px;
    //   right: -220px;
    //   color: rgb(153,153,153);
    // }
    // .el-icon {
    //   position:;
    //   top: -200px;
    //   right: -305px;
    // }
  }
}
.login-form {
  margin-top: 30px;
}
</style>
