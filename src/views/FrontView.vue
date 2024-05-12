<script setup lang="ts">
import type { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
import { SpecificationNode, type SpecificationTree } from '@/classes/SpecificationTree'
import { SPECIFICATION_TYPE } from '@/enum/Specification'
import { useProductsStore } from '@/stores/products'
import { useSpecificationStore } from '@/stores/specifications'
import type { SpecificationImgItem, SpecificationItem } from '@/types/Specification'
import { set } from 'lodash'
import { NFlex, NImage, NButton, NInputNumber, createDiscreteApi } from 'naive-ui'
import { computed, onMounted, ref, type ComputedRef } from 'vue'
const { message } = createDiscreteApi(['message'])
const specificationStore = useSpecificationStore()
const productsStore = useProductsStore()
const specificationList = ref<(SpecificationImg | SpecificationNormal)[]>([])
const products = ref<SpecificationTree[]>([])
const imageItems = ref<SpecificationImgItem[]>([])
const selectedImgItem = ref<SpecificationImgItem>()
const selectedSpecification = ref<Record<string, string>>({}) //規格的uuid, 規格內項目的uuid
const currentTree = ref<SpecificationTree>()
const productInfo = ref<SpecificationNode>()
const purchaseInfo = ref<{ uuid: string; counts: number }>({ uuid: '', counts: 1 })

specificationStore.$subscribe((mutations, state) => {
  const list = state.specificationList as (SpecificationImg | SpecificationNormal)[]
  productsStore.update(list)
  resetSelectedSpecification(list)
})

productsStore.$subscribe((mutation, state) => {
  products.value = state.products
})

function onSelect(sUUid: string, itemUUid: string, isImg: boolean) {
  for (const prop in selectedSpecification.value) {
    if (prop === sUUid) {
      selectedSpecification.value[prop] = itemUUid
    }
    if (isImg) {
      for (const tree of products.value) {
        //判斷有沒有price/counts，有的話代表找到
        if (tree.root.itemUUid == itemUUid) {
          currentTree.value = tree

          if (specificationList.value.length == 1) {
            productInfo.value = tree.root
          }
        }
      }
    } else if (currentTree.value) {
      const t = currentTree.value
      const node = t.searchItem(t.root, itemUUid)
      if (node && node.counts !== undefined) {
        productInfo.value = node
      }
    }
  }
  console.log(productInfo.value)
}

function purchase(): void {
  if (!selectedSpecification.value) return
  if (productInfo.value && purchaseInfo.value.counts > productInfo.value.counts) {
    message.error('購買失敗，超過最大數量')
  } else {
    message.success('購買成功')
  }
}

function resetSelectedSpecification(list: (SpecificationImg | SpecificationNormal)[]) {
  const temp = selectedSpecification.value
  for (const item of list) {
    set(temp, item.uuid, '')
  }
  selectedSpecification.value = temp
}

function countChange(newValue: null | number) {
  if (newValue) purchaseInfo.value.counts = newValue
}

onMounted(() => {
  specificationList.value = specificationStore.specificationList
  products.value = productsStore.products
  resetSelectedSpecification(specificationList.value as (SpecificationImg | SpecificationNormal)[])

  if (specificationList.value.length !== 0 && specificationList.value[0].items.length !== 0) {
    imageItems.value = (specificationList.value[0] as SpecificationImg).items
    selectedImgItem.value = imageItems.value[0]
  }
})
</script>

<template>
  <n-flex class="wrapper" justify="center" :wrap="false">
    <!-- IMG -->
    <n-flex vertical class="left">
      <n-image width="1200" height="600" :src="'https://picsum.photos/200/300'" />
      <n-flex>
        <n-image v-for="item in imageItems" :src="item.imgUrl" :key="item.uuid" width="100" height="100" />
      </n-flex>
    </n-flex>
    <!-- INFO -->
    <n-flex vertical class="right">
      <h2>前端作業測試</h2>
      <span class="price">$ {{ selectedSpecification?.price || 0 }} </span>
      <n-flex v-for="s in specificationList" :key="s.uuid" vertical>
        <n-flex>
          <span>{{ s.name }}</span>
          <n-button
            size="small"
            v-for="item in s.items"
            :key="item.uuid"
            @click="onSelect(s.uuid, item.uuid, s.getType() === SPECIFICATION_TYPE.IMAGE)"
            >{{ item.name }}</n-button
          >
        </n-flex>
      </n-flex>
      <n-flex align="center">
        <span>數量</span>
        <n-input-number
          :on-change="v => countChange(v)"
          :default-value="1"
          :min="0"
          :max="selectedSpecification?.counts"
        />
        <span class="max-count-hint">最大數量{{ productInfo?.counts }}</span>
      </n-flex>
      <n-button type="primary" @click="purchase" :disabled="productInfo?.counts == 0">購買</n-button>
    </n-flex>
  </n-flex>
</template>

<style scoped>
.wrapper {
  width: 100%;
}

.left {
  width: 50%;
}
.right {
  padding: 0 12px;
  width: 50%;
}

.price {
  font-size: 1.2rem;
  color: orange;
}

.max-count-hint {
  color: #aaa;
}

.n-input-number {
  width: 150px;
}
</style>
