<script lang="ts" setup>
import type { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
import { SPECIFICATION_TYPE } from '@/enum/Specification'
import type { SpecificationImgItem, SpecificationItem } from '@/types/Specification'
import { NButton, NSpace, NImage } from 'naive-ui'
import { uuid } from 'vue-uuid'

const props = defineProps<{ specification: SpecificationImg | SpecificationNormal }>()
const { specification: s } = props

function isImgSpecification(s: SpecificationImg | SpecificationNormal): boolean {
  return s.getType() === SPECIFICATION_TYPE.IMAGE
}

function push(s: SpecificationImg | SpecificationNormal): void {
  //https://picsum.photos/id/1/50/50
  if (isImgSpecification(s)) s.items.push({ imgUrl: '', uuid: uuid.v4(), name: '' })
  else (s.items as SpecificationItem[]).push({ uuid: uuid.v4(), name: '' })
}
//TODO:
function uploadImg(event: Event, item: SpecificationImgItem): void {
  const files: FileList | null = (event.target as HTMLInputElement).files
  if (!files || files.length == 0) return
  item.imgUrl = URL.createObjectURL(files[0])
}
</script>
<template>
  <n-space>
    <n-space v-for="item in s.items" :key="item.uuid">
      <div>
        <div v-if="isImgSpecification(s)">
          <n-image
            v-if="(item as SpecificationImgItem).imgUrl"
            :src="(item as SpecificationImgItem).imgUrl"
            alt=""
            width="50"
            height="50"
          />
          <input v-else type="file" @change="e => uploadImg(e, item as SpecificationImgItem)" accept="image/*" />
        </div>
        <input placeholder="請輸入" v-model="item.name" />
      </div>
      <n-button @click="s.removeItem(item.uuid)">remove</n-button>
    </n-space>

    <n-button @click="push(s)">新增規格的12</n-button>
  </n-space>
</template>
