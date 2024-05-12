export class SpecificationTree {
  public readonly root: SpecificationNode
  constructor(root: SpecificationNode) {
    this.root = root
  }

  public search(root: SpecificationNode, targetuuId: string) {
    const queue = [root]
    while (queue.length > 0) {
      const node = queue.shift()
      if (!node) continue
      if (node.uuid === targetuuId) return node
      else if (node.hasChildren()) {
        queue.push(...node.children)
      }
    }
  }

  public searchItem(root: SpecificationNode, itemUUid: string) {
    const queue = [root]
    while (queue.length > 0) {
      const node = queue.shift()
      if (!node) continue
      if (node.itemUUid === itemUUid) return node
      else if (node.hasChildren()) {
        queue.push(...node.children)
      }
    }
  }

  public findLastLevelNodes(root: SpecificationNode): SpecificationNode[] {
    let currentLevelNodes: SpecificationNode[] = []
    let queue: SpecificationNode[] = [root] //第一層開始往下遍歷
    while (queue.length > 0) {
      const levelSize = queue.length
      currentLevelNodes = [] // 清空當前層的節點列表，準備收集新一層

      for (let i = 0; i < levelSize; i++) {
        const node = queue.shift() // 從隊列中取出節點
        if (node) {
          currentLevelNodes.push(node) // 加入當前層的節點列表

          if (node.hasChildren()) {
            queue.push(...node.children)
          }
        }
      }
    }

    return currentLevelNodes
  }
}

export class SpecificationNode {
  public uuid: string
  public counts: number
  public price: number
  public readonly name: string
  public readonly children: SpecificationNode[]
  public readonly parentUUid: string
  public readonly itemUUid: string
  public readonly imgUrl?: string
  constructor(uuid: string, name: string, parentUUid: string, itemUUid: string, imgUrl?: string) {
    this.uuid = uuid
    this.counts = 1
    this.price = 0
    this.name = name
    this.children = []
    this.parentUUid = parentUUid
    this.itemUUid = itemUUid
    if (imgUrl) this.imgUrl = imgUrl
  }

  public addNode(node: SpecificationNode): void {
    this.children.push(node)
  }

  public hasChildren(): boolean {
    return this.children.length > 0
  }
}
