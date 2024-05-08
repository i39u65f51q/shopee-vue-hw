export class SpecificationTree {
  public readonly root: SpecificationNode[]
  constructor(root: SpecificationNode[]) {
    this.root = root
  }

  public search(node: SpecificationNode, targetId: number, targetType: string) {
    //this.parents.forEach(n => {})
  }

  public remove(node: SpecificationNode, targetId: number, targetType: string) {
    //this.parents.forEach(n => {})
  }
}

export class SpecificationNode {
  public id: number
  public counts: number
  public price: number
  public readonly type: string
  public readonly children: SpecificationNode[]
  constructor(id: number, type: string) {
    this.id = id
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
