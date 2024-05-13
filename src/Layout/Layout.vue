<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { NLayout, NSpace, NLayoutFooter, NLayoutHeader, NLayoutContent, useMessage, NButton } from 'naive-ui'

const router = useRouter()

function toFront(): void {
  router.push({ path: '/front' })
}

function toBack(): void {
  router.push({ path: '/back' })
}
</script>
<template>
  <n-space vertical size="large">
    <n-layout>
      <n-layout-header>
        <n-button @click="toFront">前台</n-button>
        <n-button @click="toBack">後台</n-button>
      </n-layout-header>
      <n-layout-content content-style="padding:24px">
        <RouterView />
      </n-layout-content>
      <n-layout-footer></n-layout-footer>
    </n-layout>
  </n-space>
</template>
<style scoped>
.n-layout {
  width: 100%;
  min-height: 100vh;
}
.n-layout-header {
  padding: 0 24px;
  margin-top: 24px;
  display: flex;
  gap: 0.5rem;
}
</style>
