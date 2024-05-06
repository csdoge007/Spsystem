<template>
  <div class="login-form">
    <el-form 
      ref="ruleFormRef" 
      :rules="registRules"
      :model="form" 
      size="large">
      <el-form-item prop="account">
        <el-input clearable placeholder="账号" :prefix-icon="User" v-model="form.account"/>
      </el-form-item>
      <el-form-item prop="username">
        <el-input clearable placeholder="用户名" :prefix-icon="UserFilled" v-model="form.username"/>
      </el-form-item>
      <el-form-item prop="password">
        <el-input  
        clearable placeholder="密码" 
        :prefix-icon="Lock" 
        v-model="form.password" 
        autocomplete="new-password"
        :readonly="pwdReadOnly"
        show-password
        @input="newPassInput"
        @mousedown="newPassMouseDown" />
      </el-form-item>
      <el-form-item :rules="repeatPasswordRule" prop="repeatPassword">
        <el-input 
        clearable 
        placeholder="确认密码" 
        :prefix-icon="Lock" 
        v-model="form.repeatPassword"
        show-password
        :readonly="pwdReadOnly"
        @input="newPassInput"
        @mousedown="newPassMouseDown"/>
      </el-form-item>
      <el-form-item prop="corporationCode">
        <el-input clearable placeholder="公司码" :prefix-icon="OfficeBuilding" v-model="form.corporationCode"/>
      </el-form-item>
      <el-form-item>
        <el-button size="default" type="primary" @click="onRegist(ruleFormRef)" :loading="loading">
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
import { reactive, ref } from 'vue';
import { registRules } from '../utils/rule';
import { registerUser } from '@/api/api'; 
import { ElMessage } from 'element-plus';
defineOptions({
  name: "LoginRegist",
});
console.log('registrule', registRules);
const ruleFormRef = ref();
const loading = ref(false);
const pwdReadOnly = ref(true);
// const passType = ref('input');
const form = reactive({
  account: "",
  username: "",
  password: "",
  repeatPassword: "",
  corporationCode: "",
});

const repeatPasswordRule = [
  {
    validator: (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (form.password !== value) {
        callback(
          new Error("两次密码输入不一致")
        );
      } else {
        callback();
      }
    },
    trigger: "blur"
  }
];
const onRegist = async (formEl) => {
  if (!formEl) return;
  loading.value = true;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        const { repeatPassword, ...userInfo } = form;
        const { data } = await registerUser(userInfo);
        const { errorTip, msg } = data;
        if (errorTip === 1) {
          ElMessage({
            message: '公司未在本系统注册',
            type: 'warning',
          });
        } else if (errorTip === 2) {
          ElMessage({
            message: '账号已存在',
            type: 'warning',
          });
        } else if (errorTip === 3) {
          ElMessage({
            message: '该公司已存在该用户',
            type: 'warning',
          });
        }
        if (msg) {
          ElMessage({
            message: msg,
            type: 'success',
          })
        }
        loading.value = false;
      } catch (error) {
        loading.value = false;
      }
    } else {
      loading.value = false;
      return fields;
    }
  });
};
const newPassMouseDown = () => {
  pwdReadOnly.value = true;
  setTimeout(() => {
    pwdReadOnly.value = false;
  }, 0);
};
const newPassInput = () => {
  pwdReadOnly.value = true;
  setTimeout(() => {
    pwdReadOnly.value = false;
  }, 0);
}
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