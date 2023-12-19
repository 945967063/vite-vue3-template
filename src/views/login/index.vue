<template>
  <vue-particles id="tsparticles" :particlesInit="particlesInit" :options="options" />

  <!-- 登录 start -->
  <Login v-if="login.current === 1" />
  <!-- 登录 end -->

  <!-- 注册 start -->
  <Register v-if="login.current === 2" />
  <!-- 注册 end -->

  <!-- 忘记密码 start -->
  <UpdatePassword v-if="login.current === 3" />
  <!-- 忘记密码 end -->

  <div class="absolute right-2 top-2 flex">
    <LanguageAndDark />
  </div>
</template>

<script lang="ts" setup>
  import { loadSlim } from 'tsparticles-slim';
  import useStore from '@/store';
  import Login from './components/login.vue';
  import Register from './components/register.vue';
  import UpdatePassword from './components/updatePassword.vue';

  const { routers, login } = useStore();
  onMounted(() => {
    routers.asyncRouter = [];
  });

  // <!--引入粒子特效的相关配置-->
  const options = {
    background: {
      color: {
        value: '', //粒子颜色
      },
      // image: `url(${imageBg})`,
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
        value: '#004066',
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
