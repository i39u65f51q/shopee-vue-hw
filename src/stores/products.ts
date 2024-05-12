import { defineStore } from 'pinia'
import { ref } from 'vue'
import { SpecificationNode, SpecificationTree } from '@/classes/SpecificationTree'
import type { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
import type { SpecificationImgItem, SpecificationItem } from '@/types/Specification'
import { uuid } from 'vue-uuid'

export const useProductsStore = defineStore('product', () => {
  const products = ref<SpecificationTree[]>([])

  function update(specificationList: (SpecificationImg | SpecificationNormal)[]): void {
    if (specificationList.length === 0) return
    const trees: SpecificationTree[] = []
    if (specificationList.length > 0) {
      //圖片檔規格
      ;(specificationList[0] as SpecificationImg).items.forEach((s: SpecificationImgItem) => {
        const node = new SpecificationNode(uuid.v4(), s.name, specificationList[0].uuid, s.uuid, s.imgUrl)
        trees.push(new SpecificationTree(node)) //圖片檔規格為root，每一格圖片檔規格為一棵樹
      })
      trees.forEach((tree: SpecificationTree) => {
        //圖片後的其他規格
        for (let i = 1; i < specificationList.length; i++) {
          //尋找每個圖片規格的最後一個規格新增新規格
          const nodes = tree.findLastLevelNodes(tree.root)
          nodes.forEach(node => {
            //colKey為規格得uuid，非規格內item的uuid
            const { uuid: parentUUid, items } = specificationList[i]
            items.forEach((item: SpecificationItem) => {
              const newNode = new SpecificationNode(uuid.v4(), item.name, parentUUid, item.uuid)
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
