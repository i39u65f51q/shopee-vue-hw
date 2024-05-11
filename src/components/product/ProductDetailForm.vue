<script lang="ts" setup>
import type { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
import type { SpecificationTree } from '@/classes/SpecificationTree'
import { useProductsStore } from '@/stores/products'
import { useSpecificationStore } from '@/stores/specifications'
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

// 商品規格資料
</script>

<template>
  <div v-for="(p, index) in products" :key="index">
    {{ p.root.name }}
  </div>
</template>
