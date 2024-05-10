<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { RouterView, useRouter } from 'vue-router'
import { NLayout, NSpace, NLayoutFooter, NLayoutHeader, NLayoutContent } from 'naive-ui'

onMounted(() => {
  const router = useRouter()
  router.push({ path: '/back' })
})
</script>
<template>
  <n-space vertical size="large">
    <n-layout>
      <n-layout-header></n-layout-header>
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
  height: 100%;
}
</style>
