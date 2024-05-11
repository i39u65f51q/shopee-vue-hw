<script lang="ts" setup>
import type { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
import { SPECIFICATION_TYPE } from '@/enum/Specification'
import type { SpecificationImgItem, SpecificationItem } from '@/types/Specification'
import { NButton, NImage, NFlex, NGrid, NGridItem, NInput } from 'naive-ui'
import { uuid } from 'vue-uuid'

const props = defineProps<{ specification: SpecificationImg | SpecificationNormal }>()
const { specification: s } = props

function isImgSpecification(s: SpecificationImg | SpecificationNormal): boolean {
  return s.getType() === SPECIFICATION_TYPE.IMAGE
}

function push(s: SpecificationImg | SpecificationNormal): void {
  if (isImgSpecification(s)) s.items.push({ imgUrl: '', uuid: uuid.v4(), name: '' })
  else (s.items as SpecificationItem[]).push({ uuid: uuid.v4(), name: '' })
}

function uploadImg(event: Event, item: SpecificationImgItem): void {
  const files: FileList | null = (event.target as HTMLInputElement).files
  if (!files || files.length == 0) return
  item.imgUrl = URL.createObjectURL(files[0])
}
</script>
<template>
  <n-grid :cols="2" x-gap="8" y-gap="8">
    <n-grid-item v-for="item in s.items" :key="item.uuid">
      <n-flex :wrap="false" align="center">
        <n-flex v-if="isImgSpecification(s)" align="center">
          <n-image
            v-if="(item as SpecificationImgItem).imgUrl"
            :src="(item as SpecificationImgItem).imgUrl"
            alt=""
            width="35"
            height="35"
          />
          <n-flex v-else>
            <input
              type="file"
              @change="e => uploadImg(e, item as SpecificationImgItem)"
              accept="image/*"
              :id="item.uuid"
            />
            <label class="upload-label" :for="item.uuid">圖檔</label>
          </n-flex>
        </n-flex>
        <n-input placeholder="請輸入" v-model:value="item.name" type="text" />
        <n-button @click="s.removeItem(item.uuid)">-</n-button>
      </n-flex>
    </n-grid-item>
    <n-grid-item>
      <n-button @click="push(s)" class="add-s-btn" type="info">新增{{ s.name }}</n-button>
    </n-grid-item>
  </n-grid>
</template>
<style scoped>
input[type='file'] {
  display: none;
}

.n-input {
  width: 90%;
}
.n-grid-item {
  width: 100%;
}

.add-s-btn {
  width: 100%;
}

.upload-label {
  border-radius: 4px;
  padding: 4px;
  cursor: pointer;
  background-color: #eee;
  border: 1px solid #ddd;
  width: 50px;
  text-align: center;
}
</style>
