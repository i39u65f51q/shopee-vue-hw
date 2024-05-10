export class SpecificationTree {
  public readonly root: SpecificationNode
  constructor(root: SpecificationNode) {
    this.root = root
  }

  public search(node: SpecificationNode, targetuuId: string) {
    //this.parents.forEach(n => {})
  }

  public remove(node: SpecificationNode, targetuuId: string) {
    //this.parents.forEach(n => {})
  }

  public getLastLevelNodes(): SpecificationNode[] {
    let currentLevelNodes: SpecificationNode[] = []
    let queue: SpecificationNode[] = [this.root] //第一層開始往下遍歷
    while (queue.length > 0) {
      const size: number = queue.length
      currentLevelNodes = []
      for (let i = 0; i < size; i++) {
        const node: SpecificationNode | undefined = queue.shift() //從最前面開始清node
        if (!node) break
        currentLevelNodes.push(node)
        if (node.hasChildren()) {
          queue.push(...node.children)
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
  public readonly type: string
  public readonly children: SpecificationNode[]
  constructor(uuid: string, type: string) {
    this.uuid = uuid
    this.counts = 1
    this.price = 0
    this.type = type
    this.children = []
  }

  public addNode(node: SpecificationNode): void {
    this.children.push(node)
  }

  public hasChildren(): boolean {
    return this.children.length > 0
  }
}
