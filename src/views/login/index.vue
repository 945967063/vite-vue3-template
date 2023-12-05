<template>
  <div class="w-full h-full flex-c relative">
    <el-form class="w-[300px]" ref="ruleFormRef" :model="ruleForm" :rules="loginRules" status-icon>
      <el-form-item
        prop="name"
        :rules="[
          {
            required: true,
            message: $t('login.loginAccount'),
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model.trim="ruleForm.name"
          clearable
          prefix-icon="UserFilled"
          :placeholder="$t('login.loginAccount')"
        />
      </el-form-item>
      <el-form-item class="mt-5" prop="password">
        <el-input
          v-model.trim="ruleForm.password"
          type="password"
          show-password
          clearable
          prefix-icon="lock"
          :placeholder="$t('login.loginPassword')"
        />
      </el-form-item>
      <el-form-item class="mt-10">
        <el-button type="primary" class="w-full" @click="submitForm(ruleFormRef)">
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

  interface RuleForm {
    name: string;
    password: string;
  }
  const router = useRouter();

  const ruleFormRef = ref<FormInstance>();
  const ruleForm = reactive<RuleForm>({
    name: '',
    password: '',
  });

  const submitForm = async (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    await formEl.validate((valid, fields) => {
      if (valid) {
        console.log('submit!');
        router.push('/home');
      } else {
        console.log('error submit!', fields);
      }
    });
  };
</script>
