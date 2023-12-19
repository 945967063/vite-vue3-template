<template>
  <div class="navbar">
    <div class="left-side">
      <el-space>
        <img
          class="w-[33px] h-[33px] rounded-[33px]"
          alt="logo"
          src="https://avatars.githubusercontent.com/u/89059293?v=4"
        />

        酌饮慢思倾楼
      </el-space>
    </div>
    <div class="right-side">
      <div>
        <el-button
          type="primary"
          :icon="isFullscreen ? 'FullScreen' : 'FullScreen'"
          circle
          @click="toggleFullScreen"
        />
      </div>
      <LanguageAndDark />
      <div>
        <el-dropdown @command="handleCommand">
          <el-avatar :size="32" :style="{ marginRight: '8px', cursor: 'pointer' }">
            <img alt="avatar" src="https://avatars.githubusercontent.com/u/89059293?v=4" />
          </el-avatar>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="pim">{{ $t('login.basicInformation') }}</el-dropdown-item>
            </el-dropdown-menu>
            <el-dropdown-menu>
              <el-dropdown-item command="logout">{{ $t('login.logout') }}</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
  <el-dialog v-model="dialogVisible" title="基本信息" width="30%">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-position="top">
      <el-form-item label="用户昵称" prop="nickName">
        <el-input v-model="ruleForm.nickName" class="w-full" placeholder="请输入用户昵称" />
      </el-form-item>
      <el-form-item label="用户角色">
        <el-input v-model="ruleForm.isAdmin" class="w-full" disabled />
      </el-form-item>
      <el-form-item label="邮箱地址">
        <el-input v-model="ruleForm.email" class="w-full" disabled />
      </el-form-item>

      <!-- <div class="flex justify-end">
        <el-button class="w-[148px]" type="primary" @click="submitForm(ruleFormRef)">
          保存
        </el-button>
      </div> -->
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
  import { useFullscreen } from '@vueuse/core';
  import useStore from '@/store';
  import { FormInstance } from 'element-plus';
  const { login } = useStore();
  const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();
  const dialogVisible = ref(false);
  const handleCommand = (command: string | number | object) => {
    if (command === 'logout') {
      login.logout();
    }
    if (command === 'pim') {
      const userInfo = localStorage.getItem('vue3-admin-userInfo');
      if (userInfo) {
        const { nickName, isAdmin, email } = JSON.parse(userInfo);
        ruleForm.nickName = nickName;
        ruleForm.isAdmin = isAdmin ? '管理员' : '普通用户';
        ruleForm.email = email;
      }
      dialogVisible.value = true;
    }
  };
  const ruleFormRef = ref<FormInstance>();
  const ruleForm = reactive({
    nickName: '',
    isAdmin: '',
    email: '',
  });
  const rules = reactive({
    nickName: [
      {
        required: true,
        message: '请输入昵称',
        trigger: 'blur',
      },
    ],
  });

  // const submitForm = async (formEl: FormInstance | undefined) => {
  //   if (!formEl) return;
  //   await formEl.validate(async (valid, fields) => {
  //     if (valid) {
  //     } else {
  //       console.log('error submit!', fields);
  //     }
  //   });
  // };
</script>

<style scoped lang="scss">
  .navbar {
    display: flex;
    justify-content: space-between;
    height: 60px;
    background-color: var(--el-color-white);
    border-bottom: 1px solid var(--color-border);
  }

  .left-side {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .center-side {
    flex: 1;
  }

  .right-side {
    display: flex;
    padding-right: 20px;
    align-items: center;
    list-style: none;
    & > div {
      margin-left: 20px;
    }
  }
</style>
@/i18n
