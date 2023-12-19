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
      <el-form-item class="mt-5" prop="passWord">
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
      <el-form-item>
        <div class="w-full flex justify-between">
          <el-button link @click="login.current = 3">{{ $t('login.forgetPassword') }}</el-button>
          <el-button link @click="login.current = 2">{{ $t('login.register') }}</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import type { FormInstance } from 'element-plus';
  import { loginRules } from '../utils/rule';
  import { loginApi } from '@/api/login';
  import useStore from '@/store';
  import i18n from '@/i18n/index';

  const t = i18n.global.t;
  interface RuleForm {
    useName: string;
    passWord: string;
  }
  const router = useRouter();
  const loading = ref(false);
  const { routers, login } = useStore();

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
        await loginApi({
          bodyParams: {
            userName: ruleForm.useName,
            passWord: ruleForm.passWord,
          },
        })
          .then(async (res) => {
            if (res.code === 201) {
              localStorage.setItem(
                'vue3-admin-token',
                JSON.stringify({
                  accessToken: res.data.accessToken,
                  refreshToken: res.data.refreshToken,
                })
              );
              //存用户信息
              localStorage.setItem('vue3-admin-userInfo', JSON.stringify(res.data.userInfo));
              await routers.getAsyncRouter();
              router.push('/home');
              ElMessage.success(t('login.loginSuccess'));
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
