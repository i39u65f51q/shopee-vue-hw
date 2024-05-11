<script setup lang="ts">
import { useSpecificationStore } from '@/stores/specifications'
import SpecificationForm from '@/components/specification/SpecificationForm.vue'
import ProductDetailForm from '@/components/product/ProductDetailForm.vue'
import { NSpace, NButton, NFlex } from 'naive-ui'
import type { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
const { specificationList, addSpecification, removeSpecification } = useSpecificationStore()

function add(): void {
  addSpecification('規格名稱')
}

function remove(uuid: string): void {
  removeSpecification(uuid)
}
</script>
<template>
  <n-space vertical justify="space-between">
    <n-flex align="center">
      <span>規格</span>
      <n-button v-on:click="add" type="primary">新增規格</n-button>
    </n-flex>
    <n-flex class="form-wrap" vertical>
      <SpecificationForm
        v-for="s in specificationList"
        :key="s.uuid"
        :remove="remove"
        :specification="(s as SpecificationImg | SpecificationNormal)"
      />
    </n-flex>
    <ProductDetailForm />
  </n-space>
</template>

<style scoped></style>
