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
          ]" prop="username">
              <el-input v-model="ruleForm.username" clearable placeholder="账号" autocomplete="new-password" />
            </el-form-item>



            <el-form-item prop="password">
              <el-input v-model="ruleForm.password" clearable show-password placeholder="密码"
                autocomplete="new-password" />
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
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import { bg } from "./utils/static.js";
defineOptions({
  name: "Login"
});

const loading = ref(false);
const ruleFormRef = ref();


const ruleForm = reactive({
  username: "",
  password: ""
});

const onLogin = async (formEl) => {
  loading.value = true;
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {

    } else {
      loading.value = false;
      return fields;
    }
  });
};

/** 使用公共函数，避免`removeEventListener`失效 */
function onkeypress({ code }) {
  if (code === "Enter") {
    onLogin(ruleFormRef.value);
  }
}

onMounted(() => {
  window.document.addEventListener("keypress", onkeypress);
});

onBeforeUnmount(() => {
  window.document.removeEventListener("keypress", onkeypress);
});
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
