type SpecificationItem = {
  id: number
  name: string
}

type SpecificationImgItem = {
  imgUrl: string
} & SpecificationItem

abstract class SpecificationBase {
  public readonly id: number
  public name: string
  public abstract items: SpecificationItem[]
  constructor(id: number, name: string) {
    this.id = id
    this.name = name
  }

  //新增規格內項目
  public pushItem(item: SpecificationBase) {
    this.items.push(item)
  }
  //移除規格內項目
  public removeItem(id: number) {
    if (this.items.length == 1) return
    this.items.filter(item => item.id !== id)
  }
}

//有圖片的規格
export class SpecificationImg extends SpecificationBase {
  public readonly items: SpecificationImgItem[]
  constructor(id: number, name: string) {
    super(id, name)
    this.items = [{ id: 1, imgUrl: '', name: '' }]
  }
}

//普通文字的規格
export class SpecificationNormal extends SpecificationBase {
  public readonly items: SpecificationItem[]
  constructor(id: number, name: string) {
    super(id, name)
    this.items = [{ id: 1, name: '' }]
  }
}
