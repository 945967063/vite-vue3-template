<template>
  <div>
    <a-space direction="vertical">
      <a-space>
        <a-button type="primary" status="success">Primary</a-button>
        <a-button status="success">Default</a-button>
        <a-button type="dashed" status="success">Dashed</a-button>
        <a-button type="outline" status="success">Outline</a-button>
        <a-button type="text" status="success">Text</a-button>
      </a-space>
      <a-space>
        <a-button type="primary" status="warning">Primary</a-button>
        <a-button status="warning">Default</a-button>
        <a-button type="dashed" status="warning">Dashed</a-button>
        <a-button type="outline" status="warning">Outline</a-button>
        <a-button type="text" status="warning">Text</a-button>
      </a-space>
      <a-space>
        <a-button type="primary" status="danger">Primary</a-button>
        <a-button status="danger">Default</a-button>
        <a-button type="dashed" status="danger">Dashed</a-button>
        <a-button type="outline" status="danger">Outline</a-button>
        <a-button type="text" status="danger">Text</a-button>
      </a-space>
    </a-space>
    <a-space>
      <a-input :style="{ width: '320px' }" placeholder="Please enter something" allow-clear />
      <a-input
        :style="{ width: '320px' }"
        default-value="content"
        placeholder="Please enter something"
        allow-clear
      />
    </a-space>
    <a-date-picker />
  </div>
</template>
<script setup lang="ts"></script>
<style lang="scss" scoped></style>
