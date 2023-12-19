<template>
  <div class="w-full h-full flex-c relative">
    <el-form
      label-position="top"
      class="w-[300px]"
      ref="ruleFormRef"
      :model="ruleForm"
      :rules="loginRules"
      status-icon
    >
      <el-form-item
        label="账号"
        prop="userName"
        :rules="[
          {
            required: true,
            message: '请输入账号',
            trigger: 'blur',
          },
        ]"
      >
        <el-input v-model.trim="ruleForm.userName" clearable placeholder="请输入账号" />
      </el-form-item>
      <el-form-item
        label="邮箱"
        prop="email"
        :rules="[
          {
            required: true,
            message: '请输入邮箱',
            trigger: 'blur',
          },
          {
            type: 'email',
            message: '请输入正确的邮箱格式',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model.trim="ruleForm.email" clearable placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item
        label="验证码"
        prop="captcha"
        :rules="[
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur',
          },
        ]"
      >
        <div class="w-full flex justify-between">
          <el-input v-model.trim="ruleForm.captcha" clearable placeholder="请输入验证码" />
          <el-button
            class="ml-4 w-[200px]"
            type="primary"
            :disabled="disabledCode"
            @click="getCode"
          >
            {{ disabledCode ? codeTime + 's' : '获取验证码' }}
          </el-button>
        </div>
      </el-form-item>

      <el-form-item
        label="密码"
        prop="passWord"
        :rules="[
          {
            required: true,
            message: '请输入新密码',
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model.trim="ruleForm.passWord"
          type="password"
          show-password
          clearable
          placeholder="请输入新密码"
        />
      </el-form-item>
      <el-form-item label="确认密码" prop="passwords" :rules="repeatPasswordRule">
        <el-input
          v-model.trim="ruleForm.passwords"
          type="password"
          show-password
          clearable
          placeholder="请再次输入新密码"
        />
      </el-form-item>

      <el-form-item class="mt-10">
        <el-button
          type="primary"
          class="w-full"
          :loading="loading"
          @click="submitForm(ruleFormRef)"
        >
          确认
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="info" class="w-full" @click="login.current = 1">返回</el-button>
      </el-form-item>
    </el-form>
    <div class="absolute right-2 top-2 flex">
      <LanguageAndDark />
    </div>
  </div>
</template>
<script setup lang="ts">
  import type { FormInstance } from 'element-plus';
  import { loginRules } from '../utils/rule';
  import { updatePassword, updatePasswordCodeApi } from '@/api/login';
  import useStore from '@/store';
  interface RuleForm {
    passWord: string;
    passwords: string;
    email: string;
    captcha: string;
    userName: string;
  }
  const { login } = useStore();
  const loading = ref(false);
  const ruleFormRef = ref<FormInstance>();
  const ruleForm = reactive<RuleForm>({
    passWord: '',
    passwords: '',
    email: '',
    captcha: '',
    userName: '',
  });
  const disabledCode = ref(false);
  const codeTime = ref(60);
  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        loading.value = true;
        await updatePassword({
          bodyParams: {
            password: ruleForm.passWord,
            email: ruleForm.email,
            captcha: ruleForm.captcha,
            userName: ruleForm.userName,
          },
        })
          .then((res) => {
            console.log(res);
            if (res.code === 201) {
              ElMessage.success('密码修改成功');
              login.current = 1;
            }
          })
          .finally(() => {
            loading.value = false;
          });
      } else {
        console.log('error submit!', fields);
      }
    });
  };
  const repeatPasswordRule = [
    {
      validator: (_rule: any, value: string, callback: any) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (ruleForm.passWord !== value) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      },
      trigger: 'blur',
    },
  ];
  const getCode = async () => {
    if (!ruleForm.email) return ElMessage.error('请输入邮箱');
    try {
      disabledCode.value = true;

      try {
        await updatePasswordCodeApi({
          params: {
            address: ruleForm.email,
          },
        });
      } catch (error) {
        disabledCode.value = false;
        ElMessage.error('验证码获取失败');
      }

      await new Promise((resolve) => {
        const timer = setInterval(() => {
          codeTime.value--;
          if (codeTime.value === 0) {
            clearInterval(timer);
            codeTime.value = 60;
            resolve('');
          }
        }, 1000);
      });
      disabledCode.value = false;
    } catch (error) {}
  };
</script>
<style lang="scss" scoped></style>
