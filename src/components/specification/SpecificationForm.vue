<script lang="ts" setup>
import { ref } from 'vue'
import type { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
import { NSpace, NButton, NCard, NDivider } from 'naive-ui'
import SpecificationItem from './SpecificationItem.vue'

const props = defineProps<{
  specification: SpecificationImg | SpecificationNormal
  remove: (uuid: string) => void
}>()
const { specification: s, remove } = props

const onEdit = ref<boolean>(false) //編輯title state

function toggleEdit(): void {
  onEdit.value = !onEdit.value
}
</script>
<template>
  <n-card>
    <n-space>
      <span v-if="!onEdit">{{ s.name }}</span>
      <input v-else v-model="s.name" />
      <span>(自定義)</span>
      <n-button @click="toggleEdit">{{ onEdit ? '完成' : '編輯' }}</n-button>
      <n-button @click="remove(s.uuid)">移除</n-button>
    </n-space>
    <n-divider />
    <SpecificationItem :specification="s" />
  </n-card>
</template>
