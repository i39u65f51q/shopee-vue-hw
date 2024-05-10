<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import { NSpace } from 'naive-ui'

const { productDetails } = useProductStore()
</script>

<template>
  <n-space> Front-page </n-space>
</template>

<style scoped></style>
