import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SpecificationNode, SpecificationTree } from '@/classes/SpecificationTree'
import type { SpecificationImg, SpecificationNormal } from '@/classes/Specification'

export const useProductsStore = defineStore('product', () => {
  const products = ref<SpecificationTree[]>([])

  function update(specificationList: (SpecificationImg | SpecificationNormal)[]): void {
    if (specificationList.length === 0) return
    const trees: SpecificationTree[] = []
    if (specificationList.length > 0) {
      //圖片檔規格
      specificationList[0].items.forEach(s => {
        const node = new SpecificationNode(s.uuid, s.name)
        trees.push(new SpecificationTree(node)) //圖片檔規格為root，每一格圖片檔規格為一棵樹
      })
      trees.forEach((tree: SpecificationTree) => {
        const lastLevelNodes: SpecificationNode[] = tree.getLastLevelNodes()
        lastLevelNodes.forEach((node: SpecificationNode) => {
          for (let i = 1; i < specificationList.length; i++) {
            const { uuid, name } = specificationList[i]
            const newNode = new SpecificationNode(uuid, name)
            node.addNode(newNode)
          }
        })
      })
      products.value = trees
    }
  }

  return { products, update }
})
