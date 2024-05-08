import { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
import type { SpecificationTree } from '@/classes/SpecificationTree'
import { defineStore } from 'pinia'
import { computed, ref, type Ref } from 'vue'

export const useProductStore = defineStore('products', () => {
  const maxCounts: number = 2
  let id: number = 1
  //規格清單
  const specificationList: Ref<(SpecificationImg | SpecificationNormal)[]> = ref([])

  //TODO: 商品清單
  const productDetails = computed(() => {
    const list: SpecificationTree[] = []

    if (specificationList.value.length === 0) return []
  })

  //新增規格
  function addSpecification(name: string): void {
    if (specificationList.value.length === maxCounts) {
      alert(`規格最大數量為${maxCounts}`)
      return
    }
    if (specificationList.value.length == 0) {
      specificationList.value.push(new SpecificationImg(id, name))
    } else {
      specificationList.value.push(new SpecificationNormal(id, name))
    }
    id++
  }

  //移除規格
  function removeSpecification(id: number): void {
    if (specificationList.value[specificationList.value.length - 1].id === id) specificationList.value.pop()
    else alert('請先刪除下一個規格')
  }

  return { specificationList, addSpecification, removeSpecification }
})
