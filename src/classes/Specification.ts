import { SPECIFICATION_TYPE } from '@/enum/Specification'
import type { SpecificationImgItem, SpecificationItem } from '@/types/Specification'

abstract class SpecificationBase {
  public readonly uuid: string
  public name: string
  private readonly type: SPECIFICATION_TYPE

  public abstract items: SpecificationItem[]
  constructor(uuid: string, name: string, type: SPECIFICATION_TYPE) {
    this.uuid = uuid
    this.name = name
    this.type = type
  }

  //新增規格內項目
  public abstract pushItem(item: SpecificationImgItem): void
  //移除規格內項目
  public removeItem(uuid: string) {
    this.items = this.items.filter(item => item.uuid !== uuid)
  }
  public getType(): SPECIFICATION_TYPE {
    return this.type
  }
}

//有圖片的規格
export class SpecificationImg extends SpecificationBase {
  public readonly items: SpecificationImgItem[]
  constructor(uuid: string, name: string) {
    super(uuid, name, SPECIFICATION_TYPE.IMAGE)
    this.items = []
  }

  public override pushItem(item: SpecificationImgItem) {
    this.items.push(item)
  }
}

//普通文字的規格
export class SpecificationNormal extends SpecificationBase {
  public readonly items: SpecificationItem[]
  constructor(uuid: string, name: string) {
    super(uuid, name, SPECIFICATION_TYPE.NORMAL)
    this.items = []
  }

  public override pushItem(item: SpecificationItem) {
    this.items.push(item)
  }
}
