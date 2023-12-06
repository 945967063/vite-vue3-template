<template>
  <vue-particles id="tsparticles" :particlesInit="particlesInit" :options="options" />
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
  import { loadSlim } from 'tsparticles-slim';
  import imageBg from '@/assets/images/bg.jpg';
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

  // <!--引入粒子特效的相关配置-->
  const options = {
    background: {
      color: {
        value: '', //粒子颜色
      },
      image: `url(${imageBg})`,
      position: '50% 50%',
      repeat: 'no-repeat',
      size: 'cover',
      opacity: 1,
    },
    fpsLimit: 60,
    interactivity: {
      events: {
        onClick: {
          enable: true,
          mode: 'push', //可用的click模式有: "push", "remove", "repulse", "bubble"。
        },
        onHover: {
          enable: true,
          mode: 'grab', //可用的hover模式有: "grab", "repulse", "bubble"。
        },
        resize: true,
      },
      modes: {
        bubble: {
          distance: 400,
          duration: 2,
          opacity: 0.8,
          size: 40,
        },
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: '#f7f035',
      },
      links: {
        color: '#f7f035', //'#dedede'。线条颜色。
        distance: 150, //线条长度
        enable: true, //是否有线条
        opacity: 0.1, //线条透明度。
        width: 1, //线条宽度。
      },
      collisions: {
        enable: false,
      },
      move: {
        direction: 'none',
        enable: true,
        outMode: 'bounce',
        random: false,
        speed: 1, //粒子运动速度。
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 80, //粒子数量。
      },
      opacity: {
        value: 0.5, //粒子透明度。
      },
      shape: {
        type: 'star', //可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
      },
      size: {
        random: true,
        value: 2,
      },
    },
    detectRetina: true,
  };
  const particlesInit = async (engine: any) => {
    await loadSlim(engine);
  };
</script>
