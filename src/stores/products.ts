import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SpecificationNode, SpecificationTree } from '@/classes/SpecificationTree'
import type { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
import type { SpecificationItem } from '@/types/Specification'

export const useProductsStore = defineStore('product', () => {
  const products = ref<SpecificationTree[]>([])

  function update(specificationList: (SpecificationImg | SpecificationNormal)[]): void {
    if (specificationList.length === 0) return
    const trees: SpecificationTree[] = []
    if (specificationList.length > 0) {
      //圖片檔規格
      specificationList[0].items.forEach((s: SpecificationItem) => {
        const node = new SpecificationNode(s.uuid, s.name, specificationList[0].uuid)
        trees.push(new SpecificationTree(node)) //圖片檔規格為root，每一格圖片檔規格為一棵樹
      })
      trees.forEach((tree: SpecificationTree) => {
        //圖片後的其他規格
        for (let i = 1; i < specificationList.length; i++) {
          //尋找每個圖片規格的最後一個規格新增新規格
          const nodes = tree.findLastLevelNodes(tree.root)
          nodes.forEach(node => {
            const { uuid, items } = specificationList[i]
            items.forEach((s: SpecificationItem) => {
              const newNode = new SpecificationNode(s.uuid, s.name, uuid)
              node.addNode(newNode)
            })
          })
        }
      })
      products.value = trees
    }
  }

  function replace(newTree: SpecificationTree[]): void {
    products.value = newTree
  }

  return { products, update, replace }
})
