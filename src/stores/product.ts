import { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
import { SpecificationNode, SpecificationTree } from '@/classes/SpecificationTree'
import { defineStore } from 'pinia'
import { computed, ref, type ComputedRef, type Ref } from 'vue'
import { uuid } from 'vue-uuid'

export const useProductStore = defineStore('products', () => {
  const maxCounts: number = 3 //TODO:
  let id: number = 1
  //規格清單
  const specificationList: Ref<(SpecificationImg | SpecificationNormal)[]> = ref([])

  // 商品規格資料
  const productDetails: ComputedRef<SpecificationTree[]> = computed(() => {
    const trees: SpecificationTree[] = []

    if (specificationList.value.length === 0) return []

    if (specificationList.value.length > 1) {
      //圖片檔規格
      specificationList.value[0].items.forEach(s => {
        const node = new SpecificationNode(s.uuid, s.name)
        trees.push(new SpecificationTree(node)) //圖片檔規格為root，每一格圖片檔規格為一棵樹
      })

      trees.forEach((tree: SpecificationTree) => {
        const lastLevelNodes: SpecificationNode[] = tree.getLastLevelNodes()
        lastLevelNodes.forEach((node: SpecificationNode) => {
          for (let i = 1; i < specificationList.value.length; i++) {
            const { uuid, name } = specificationList.value[i]
            const newNode = new SpecificationNode(uuid, name)
            node.addNode(newNode)
          }
        })
      })
    }
    return trees
  })

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

  return { specificationList, productDetails, addSpecification, removeSpecification }
})
