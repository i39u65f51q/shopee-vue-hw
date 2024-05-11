<script setup lang="ts">
import type { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
import type { SpecificationTree } from '@/classes/SpecificationTree'
import { useProductsStore } from '@/stores/products'
import { useSpecificationStore } from '@/stores/specifications'
import { NSpace } from 'naive-ui'
import { ref } from 'vue'

const specificationStore = useSpecificationStore()
const productsStore = useProductsStore()
const products = ref<SpecificationTree[]>([])

specificationStore.$subscribe((mutations, state) => {
  const specificationList = state.specificationList as (SpecificationImg | SpecificationNormal)[]
  productsStore.update(specificationList)
})

productsStore.$subscribe((mutation, state) => {
  products.value = state.products
})
</script>

<template>
  <n-space> Front-page </n-space>
</template>

<style scoped></style>
