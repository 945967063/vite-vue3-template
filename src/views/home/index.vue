<template>
  <div class="w-full home" id="home">
    <div class="w-full h-full" id="container"></div>
  </div>
</template>

<script lang="ts" setup>
  import * as THREE from 'three';
  import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
  import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
  import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
  import { DRACOLoader } from 'three/addons/loaders/DRACOLoader.js';

  onMounted(() => {
    let mixer: THREE.AnimationMixer;

    const clock = new THREE.Clock();
    const containerHome = document.getElementById('home');
    const container = document.getElementById('container');
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    console.log(container);
    //获取renderer宽高
    if (!containerHome) return;

    renderer.setSize(containerHome.offsetWidth - 140, containerHome?.offsetHeight);
    container?.appendChild(renderer.domElement);

    const pmremGenerator = new THREE.PMREMGenerator(renderer);

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xbfe3dd);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(renderer), 0.04).texture;

    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
    camera.position.set(5, 2, 8);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.target.set(0, 0.5, 0);
    controls.update();
    controls.enablePan = false;
    controls.enableDamping = true;

    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/gltf/');
    const loader = new GLTFLoader();
    loader.setDRACOLoader(dracoLoader);
    loader.load(
      '/LittlestTokyo.glb',
      (gltf) => {
        const model = gltf.scene;
        model.position.set(1, 1, 0);
        model.scale.set(0.01, 0.01, 0.01);
        scene.add(model);
        mixer = new THREE.AnimationMixer(model);
        mixer.clipAction(gltf.animations[0]).play();
        animate();
      },
      (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
      },
      (e) => {
        console.error(e);
      }
    );
    window.addEventListener('resize', () => {
      const containerHome = document.getElementById('home');
      if (!containerHome) return;
      camera.aspect = containerHome?.offsetWidth / containerHome?.offsetHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerHome?.offsetWidth, containerHome?.offsetHeight);
    });
    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      mixer.update(delta);

      controls.update();

      renderer.render(scene, camera);
    }
  });
</script>
<style>
  .home {
    height: calc(100vh - 120px);
  }
</style>
