<script setup lang="ts">
  import useStore from '@/store';
  const router = useRouter();
  const { login } = useStore();
  console.log(router);

  login.num = 2;
  const testClick = () => {
    console.log('testClick');
    router.push('/home');
  };
</script>

<template>
  <div @click="testClick">2121</div>
  <RouterView></RouterView>
</template>

<style scoped>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
  }
</style>
