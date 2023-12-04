<template>
  <div class="w-full h-full flex-c relative">
    <el-form class="w-[300px]" ref="ruleFormRef" :model="ruleForm" :rules="loginRules" status-icon>
      <el-form-item
        prop="name"
        :rules="[
          {
            required: true,
            message: '请输入登录账号',
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model.trim="ruleForm.name"
          clearable
          prefix-icon="UserFilled"
          placeholder="请输入登录账号"
        />
      </el-form-item>
      <el-form-item
        prop="password"
        :rules="[
          {
            required: true,
            message: '请输入登录账号',
            trigger: 'blur',
          },
        ]"
      >
        <el-input
          v-model.trim="ruleForm.password"
          type="password"
          clearable
          prefix-icon="lock"
          placeholder="请输入登录密码"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="w-full" @click="submitForm(ruleFormRef)">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="absolute right-2 top-2 flex">
    <div class="mr-4">
      <el-dropdown @command="changeLocaleCommand">
        <el-button type="primary" circle>
          <template #icon>
            <span class="iconfont icon-zhongyingwenyingwen"></span>
          </template>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              class="w-[100px]"
              v-for="item in locales"
              :key="item.value"
              :command="item.value"
              :value="item.value"
              :icon="item.value === currentLocale ? 'Check' : ''"
            >
              {{ item.label }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div>
      <el-button type="primary" @click="handleToggleTheme" circle>
        <template #icon>
          <span v-if="theme === 'dark'" class="iconfont icon-dark-full"></span>
          <span v-else class="iconfont icon-light-full"></span>
        </template>
      </el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import type { FormInstance } from 'element-plus';
  import { loginRules } from './utils/rule';
  import { useDark, useToggle } from '@vueuse/core';
  import useStore from '@/store';
  import { LOCALE_OPTIONS } from '@/i18n';
  import useLocale from '@/hooks/locale';
  interface RuleForm {
    name: string;
    password: string;
  }
  const router = useRouter();
  const { changeLocale, currentLocale } = useLocale();
  const { login } = useStore();
  const locales = [...LOCALE_OPTIONS];
  const isDark = useDark({
    valueDark: 'dark',
    valueLight: 'light',
    onChanged(dark: boolean) {
      // overridden default behavior
      login.toggleTheme(dark);
    },
  });
  const theme = computed(() => {
    return login.theme;
  });
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
  const handleToggleTheme = () => {
    toggleTheme();
  };
  const toggleTheme = useToggle(isDark);
  const changeLocaleCommand = (command: string | number | object) => {
    login.isCollapse = true;
    changeLocale(command as string);
    setTimeout(() => {
      login.isCollapse = false;
    }, 200);
  };
</script>
