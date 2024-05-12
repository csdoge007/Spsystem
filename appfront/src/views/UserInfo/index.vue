<template>
  <div class="userInfo">
    <div class="panel">
      <el-form ref="ruleFormRef" :model="form" label-width="auto" :rules="userRules">
        <el-form-item label="头像："><img :src="imgUrl"></el-form-item>
        <el-form-item label="账号：">{{ userInfo.account }}</el-form-item>
        <el-form-item label="用户名：" prop="name">
          <span v-if="!isEditName">{{ userInfo.name }}</span>
          <el-icon :size="20" @click="isEditName = true" v-if="!isEditName">
            <Edit />
          </el-icon>
          <div class="input-panel" v-else>
            <el-input v-model="form.name" :placeholder="form.name" size="large"></el-input>
            <el-button @click="onCancelName">取消</el-button>
            <el-button type="primary" @click="saveName(ruleFormRef)">保存</el-button>
          </div>
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <span v-if="!isEditPass">{{ userInfo.password }}</span>
          <el-icon :size="20" @click="isEditPass = true" v-if="!isEditPass">
            <Edit />
          </el-icon>
          <div class="input-panel" v-else>
            <el-input v-model="form.password" :placeholder="form.password" size="large"></el-input>
            <el-button @click="onCancelPass">取消</el-button>
            <el-button type="primary" @click="savePass(ruleFormRef)">保存</el-button>
          </div>
        </el-form-item>
        <el-form-item label="公司：">{{ userInfo.corporation }}</el-form-item>
        <el-form-item label="角色：">{{ userInfo.isAdmin ? '管理员' : '业务员' }}</el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import imgUrl from './avator.jpg';
import { Edit } from '@element-plus/icons-vue';
import { reactive, onBeforeMount, ref } from 'vue';
import { getUserInfo, updateUserInfo } from '@/api/api';
import { userRules } from '../login/utils/rule';
import { ElMessage } from 'element-plus';
import { useLoginStore } from '@/stores/user';
defineOptions({
  name: 'UserInfo',
});
const ruleFormRef = ref();
const form = reactive({
  password: '',
  name: '',
})
const userInfo = reactive({
  name: '',
  password: '',
  account: '',
  isAdmin: true,
  corporation: '易图',
});
const isEditName = ref(false);
const isEditPass = ref(false);
const saveName = async(formEl) => {
  await save({ data: form.name, type: 'username', formEl});
};
const savePass = async(formEl) => {
  await save({ data: form.password, type: 'password', formEl});
};
const onCancelName = () => {
  form.name = userInfo.name;
  isEditName.value = false;
};
const onCancelPass = () => {
  form.password = userInfo.password;
  isEditPass.value = false;
}
const save = async ({data, type, formEl}) => {
  if (!formEl) return;
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      try {
        await updateUserInfo({account: userInfo.account, data, type});
        if (type === 'username') {
          userInfo.name = form.name;
          isEditName.value = false;
          useLoginStore().setUserName();
          ElMessage({
            message: '修改用户名成功',
            type: 'success',
          });
        } else {
          userInfo.password = form.password;
          isEditPass.value = false;
          ElMessage({
            message: '修改密码成功',
            type: 'success',
          });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      return fields;
    }
  });
}
onBeforeMount(async () => {
  const data = await getUserInfo();
  const { account, password, username, corporation, ismanager } = data.data;
  console.log(data.data)
  userInfo.name = username;
  userInfo.password = password;
  userInfo.account = account;
  userInfo.isAdmin = ismanager;
  userInfo.corporation = corporation;
  form.password = password;
  form.name = username;
});
// onMounted(async () => {
//   const data = await getUserInfo();
//   const { account, password, username, corporation, ismanager } = data.data;
//   console.log(data.data)
//   userInfo.name = username;
//   userInfo.password = password;
//   userInfo.account = account;
//   userInfo.isAdmin = ismanager;
//   userInfo.corporation = corporation;
// })
</script>

<style lang="scss" scoped>
.userInfo {
  border-top: 1px solid rgb(211,211,211);
  background-color: rgb(246,246,246);
  height: 100%;
  .panel {
    height: 90%;
    margin: 20px 25px auto 25px;
    background: url('@/assets/background.png') no-repeat;
    background-position: center;
		background-size: cover;
    background-color: white;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    .input-panel {
      display: flex;
      align-items: center;
    }
    .el-icon {
      margin-left: 10px;
    }
    .el-input {
      font-size: 15px;
    }
    .el-button {
      border-radius: 10px;
      margin-left: 5px;
    }
    :deep(.el-input__wrapper) {
      border-radius: 15px;
    }
  }
}
</style>