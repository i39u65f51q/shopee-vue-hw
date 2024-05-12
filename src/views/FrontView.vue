<script setup lang="ts">
import type { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
import { SpecificationNode, type SpecificationTree } from '@/classes/SpecificationTree'
import { useProductsStore } from '@/stores/products'
import { useSpecificationStore } from '@/stores/specifications'
import type { SpecificationImgItem, SpecificationItem } from '@/types/Specification'
import { NFlex, NImage, NButton, NInputNumber, createDiscreteApi } from 'naive-ui'
import { onMounted, ref } from 'vue'
const { message } = createDiscreteApi(['message'])
const specificationStore = useSpecificationStore()
const productsStore = useProductsStore()
const specificationList = ref<(SpecificationImg | SpecificationNormal)[]>([])
const products = ref<SpecificationTree[]>([])
const imageItems = ref<SpecificationImgItem[]>([])
const selectedImgItem = ref<SpecificationImgItem>()
const selectedSpecification = ref<SpecificationNode>()
const purchaseInfo = ref<{ uuid: string; counts: number }>({ uuid: '', counts: 1 })

specificationStore.$subscribe((mutations, state) => {
  const specificationList = state.specificationList as (SpecificationImg | SpecificationNormal)[]
  productsStore.update(specificationList)
})

productsStore.$subscribe((mutation, state) => {
  products.value = state.products
})

function onSelect(item: SpecificationImgItem | SpecificationItem) {
  if (specificationList.value.length > 1) {
    //TODO:
  } else {
    // TODO: 只有圖片檔
  }
}

function purchase(): void {
  if (!selectedSpecification.value) return
  if (purchaseInfo.value.counts > selectedSpecification.value.counts) {
    message.error('購買失敗，數量超過最大')
    return
  }
  message.success('購買成功')
}

onMounted(() => {
  specificationList.value = specificationStore.specificationList
  products.value = productsStore.products
  if (products.value.length > 0) {
    selectedSpecification.value = products.value[0].root //預設選擇第一筆
  }
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
          <n-button size="small" v-for="item in s.items" :key="item.uuid" @click="onSelect(item)">{{
            item.name
          }}</n-button>
        </n-flex>
      </n-flex>
      <n-flex align="center">
        <span>數量</span>
        <n-input-number
          :v-model-value="purchaseInfo.counts"
          :default-value="1"
          :min="0"
          :max="selectedSpecification?.counts"
        />
        <span class="max-count-hint">最大數量{{ selectedSpecification?.counts }}</span>
      </n-flex>
      <n-button type="primary" @click="purchase" :disabled="selectedSpecification?.counts == 0">購買</n-button>
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
