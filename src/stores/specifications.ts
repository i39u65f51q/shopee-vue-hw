import { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
import { defineStore } from 'pinia'
import { ref, type Ref } from 'vue'
import { uuid } from 'vue-uuid'

export const useSpecificationStore = defineStore('specification', () => {
  const maxCounts: number = 2
  //規格清單
  const specificationList: Ref<(SpecificationImg | SpecificationNormal)[]> = ref([])

  //新增規格
  function addSpecification(name: string): void {
    if (specificationList.value.length === maxCounts) {
      alert(`規格最大數量為${maxCounts}`)
      return
    }
    if (specificationList.value.length == 0) {
      specificationList.value.push(new SpecificationImg(uuid.v4(), name))
    } else {
      specificationList.value.push(new SpecificationNormal(uuid.v4(), name))
    }
  }

  //移除規格
  function removeSpecification(uuid: string): void {
    if (specificationList.value[specificationList.value.length - 1].uuid === uuid) specificationList.value.pop()
    else alert('請先刪除下一個規格')
  }

  return { specificationList, addSpecification, removeSpecification }
})
