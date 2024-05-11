<script lang="ts" setup>
import type { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
import type { SpecificationTree } from '@/classes/SpecificationTree'
import { useProductsStore } from '@/stores/products'
import { useSpecificationStore } from '@/stores/specifications'
import { onMounted, ref } from 'vue'
import { NDataTable } from 'naive-ui'

const specificationStore = useSpecificationStore()
const productsStore = useProductsStore()
const products = ref<SpecificationTree[]>([])
const columns = ref<{ title: string; key: string }[]>([])
const tableData = ref([])

specificationStore.$subscribe((mutations, state) => {
  const specificationList = state.specificationList as (SpecificationImg | SpecificationNormal)[]
  productsStore.update(specificationList)
  updateColumns(specificationList)
})

productsStore.$subscribe((mutation, state) => {
  products.value = state.products
})

function updateColumns(specificationList: (SpecificationImg | SpecificationNormal)[]): void {
  columns.value = specificationList
    .map(s => {
      return { title: s.name, key: s.name }
    })
    .concat([
      { title: '價格', key: 'price' },
      { title: '商品數量', key: 'counts' },
    ])
}

function updateTableData(): void {
  tableData.value = []
}

onMounted(() => {
  updateColumns(specificationStore.specificationList as (SpecificationImg | SpecificationNormal)[])
})
</script>
<template>
  <n-data-table :columns="columns" :data="tableData"> </n-data-table>
</template>
