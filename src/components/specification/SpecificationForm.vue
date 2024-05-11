<script lang="ts" setup>
import { ref } from 'vue'
import type { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
import { NFlex, NButton, NCard, NDivider, NInput } from 'naive-ui'
import SpecificationItemWrap from './SpecificationItemWrap.vue'

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
    <n-flex align="center" :wrap="false">
      <span v-if="!onEdit">{{ s.name }}</span>
      <n-input v-else v-model:value="s.name" type="text" />
      <span class="secondary">(自定義)</span>
      <n-button @click="toggleEdit">{{ onEdit ? '完成' : '編輯' }}</n-button>
      <n-button @click="remove(s.uuid)">移除</n-button>
    </n-flex>
    <n-divider />
    <SpecificationItemWrap :specification="s" />
  </n-card>
</template>
<style scoped>
.n-input {
  width: 150px;
}
.secondary {
  color: #aaa;
}
</style>
