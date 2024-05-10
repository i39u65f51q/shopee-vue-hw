<script setup lang="ts">
import { useProductStore } from '@/stores/product'
import SpecificationForm from '@/components/specification/SpecificationForm.vue'
import { NSpace, NButton } from 'naive-ui'
import type { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
const { specificationList, addSpecification, removeSpecification } = useProductStore()

function add(): void {
  addSpecification('規格名稱')
}

function remove(uuid: string): void {
  removeSpecification(uuid)
}
</script>
<template>
  <n-space vertical justify="space-between">
    <n-space>
      <span>規格</span>
      <n-button v-on:click="add">新增規格</n-button>
      <n-space class="form-wrap" vertical>
        <SpecificationForm
          v-for="s in specificationList"
          :key="s.uuid"
          :remove="remove"
          :specification="(s as SpecificationImg | SpecificationNormal)"
        />
      </n-space>
    </n-space>
    <!-- TODO: -->
    <n-space>bottom</n-space>
  </n-space>
</template>

<style scoped></style>
