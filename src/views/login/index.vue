<template>
  <div class="w-full h-full flex-c relative">
    <el-form class="w-[300px]" ref="ruleFormRef" :model="ruleForm" :rules="loginRules" status-icon>
      <el-form-item
        prop="useName"
        :rules="[
          {
            required: true,
            message: $t('login.loginAccount'),
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model.trim="ruleForm.useName"
          clearable
          prefix-icon="UserFilled"
          :placeholder="$t('login.loginAccount')"
        />
      </el-form-item>
      <el-form-item class="mt-5" prop="password">
        <el-input
          v-model.trim="ruleForm.passWord"
          type="password"
          show-password
          clearable
          prefix-icon="lock"
          :placeholder="$t('login.loginPassword')"
        />
      </el-form-item>
      <el-form-item class="mt-10">
        <el-button
          type="primary"
          class="w-full"
          :loading="loading"
          @click="submitForm(ruleFormRef)"
        >
          {{ $t('login.login') }}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="absolute right-2 top-2 flex">
    <LanguageAndDark />
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import type { FormInstance } from 'element-plus';
  import { loginRules } from './utils/rule';
  import { login } from '@/api/login';
  interface RuleForm {
    useName: string;
    passWord: string;
  }
  const loading = ref(false);
  const router = useRouter();

  const ruleFormRef = ref<FormInstance>();
  const ruleForm = reactive<RuleForm>({
    useName: 'linian',
    passWord: 'sqray123456.',
  });

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate(async (valid, fields) => {
      if (valid) {
        loading.value = true;
        await login({
          bodyParams: {
            useName: ruleForm.useName,
            passWord: ruleForm.passWord,
          },
        })
          .then((res) => {
            if (res.status === 200) {
              localStorage.setItem('vue3-admin-token', res.data.token);
              router.push('/home');
              ElMessage.success(res.msg);
            } else {
              ElMessage.error(res.msg);
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
</script>
