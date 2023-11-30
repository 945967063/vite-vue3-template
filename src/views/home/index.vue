<template>
  <div>
    <a-space>
      <a-input class="w-40" placeholder="Please enter something" allow-clear />
      <a-input default-value="content" placeholder="Please enter something" allow-clear />
    </a-space>
    <icon-arrow-down />
  </div>
  <div>
    <a-date-picker />
    <a-space>
      <a-button type="primary" @click="handleNotification">Top Right</a-button>
      <a-button type="primary" @click="handleNotificationTopLeft">Top Left</a-button>
      <a-button type="primary" @click="handleNotificationBottomRight">Bottom Right</a-button>
      <a-button type="primary" @click="handleNotificationBottomLeft">Bottom Left</a-button>
    </a-space>
    <a-button @click="handleClick">Open Modal</a-button>
    <a-modal v-model:visible="visible" @ok="handleOk" @cancel="handleCancel">
      <template #title>Title</template>
      <div>
        You can customize modal body text by the current situation. This modal will be closed
        immediately once you press the OK button.
      </div>
    </a-modal>
  </div>
</template>
<script setup lang="ts">
  import { Notification } from '@arco-design/web-vue';
  const handleNotification = () => {
    Notification.info({
      title: 'Title',
      content: 'This is a Notification!',
    });
  };

  const handleNotificationTopLeft = () => {
    Notification.info({
      title: 'Title',
      content: 'This is a Notification!',
      position: 'topLeft',
    });
  };

  const handleNotificationBottomRight = () => {
    Notification.info({
      title: 'Title',
      content: 'This is a Notification!',
      position: 'bottomRight',
    });
  };

  const handleNotificationBottomLeft = () => {
    Notification.info({
      title: 'Title',
      content: 'This is a Notification!',
      position: 'bottomLeft',
    });
  };
  const visible = ref(false);

  const handleClick = () => {
    visible.value = true;
  };
  const handleOk = () => {
    visible.value = false;
  };
  const handleCancel = () => {
    visible.value = false;
  };
</script>
<style lang="scss" scoped></style>
