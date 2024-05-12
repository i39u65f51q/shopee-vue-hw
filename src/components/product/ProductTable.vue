<script lang="ts" setup>
import type { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
import type { SpecificationNode, SpecificationTree } from '@/classes/SpecificationTree'
import { useProductsStore } from '@/stores/products'
import { useSpecificationStore } from '@/stores/specifications'
import { onMounted, ref, h } from 'vue'
import { NDataTable, NInput } from 'naive-ui'
import type { RowData, TableColumn } from 'naive-ui/es/data-table/src/interface'
import { set } from 'lodash'
import { uuid } from 'vue-uuid'

const specificationStore = useSpecificationStore()
const productsStore = useProductsStore()
const products = ref<SpecificationTree[]>([])
const columns = ref<TableColumn[]>([])
const tableData = ref<RowData[]>([])

specificationStore.$subscribe((mutations, state) => {
  const specificationList = state.specificationList as (SpecificationImg | SpecificationNormal)[]
  productsStore.update(specificationList)
  updateColumns(specificationList)
})

productsStore.$subscribe((mutation, state) => {
  products.value = state.products
  console.log('p', state.products)
  updateTableData(state.products)
})

function updateColumns(list: (SpecificationImg | SpecificationNormal)[]): void {
  if (list.length == 0) return

  const cols: TableColumn[] = list.map((s, index: number) => {
    return { title: s.name, key: s.uuid, rowSpan: (rowData, rowIndex) => getRowSpan(list, index) }
  })
  const temp = [
    {
      title: '價格',
      key: 'price',
      rowSpan: () => 1,
      render: (row: any) => {
        return h(NInput, {
          type: 'text',
          value: row.value,
          placeholder: '請輸入價格',
          onUpdateValue: v => updatePrice(v, row),
        })
      },
    },
    {
      title: '商品數量',
      key: 'counts',
      rowSpan: () => 1,
      render: (row: any) => {
        return h(NInput, {
          type: 'text',
          value: row.value,
          placeholder: '請輸入數量',
          onUpdateValue: v => updateCounts(v, row),
        })
      },
    },
  ]
  columns.value = cols.concat(temp)
}

function updatePrice(newValue: string | number, row: RowData) {
  console.log('price', newValue)
}

function updateCounts(newValue: string | number, row: RowData) {
  console.log('count', newValue)
}

function updateTableData(trees: SpecificationTree[]): void {
  const rowDataCollection: RowData[] = []
  trees.forEach((tree: SpecificationTree) => {
    const node: SpecificationNode = tree.root
    const collection = getRowDataList(node)
    rowDataCollection.push(...collection)
  })

  function getRowDataList(node: SpecificationNode): RowData[] {
    //FIXME:
    if (!node.hasChildren()) {
      //最後一層
      const row = { key: uuid.v4(), id: node.uuid, name: node.name, price: node.price, counts: node.counts }
      set(row, node.colKey, node.name)
      return [row]
    }
    //接住最後一層的資料
    const totalCollection: RowData[] = []
    node.children.forEach(child => {
      const newCollection = getRowDataList(child) //最後一層的資料
      totalCollection.push(...newCollection)
    })
    totalCollection.forEach(rowData => {
      set(rowData, node.colKey, node.name)
    })
    //將最後一層的資料往上層送
    return totalCollection
  }
  // console.log(rowDataCollection)
  tableData.value = rowDataCollection
}

function getRowSpan(list: (SpecificationImg | SpecificationNormal)[], index: number): number {
  let counts = 1
  let nextIndex = index + 1
  for (let i = nextIndex; i < list.length; i++) {
    counts *= list[nextIndex].items.length
  }
  return counts
}

onMounted(() => {
  updateColumns(specificationStore.specificationList as (SpecificationImg | SpecificationNormal)[])
})
</script>
<template>
  <n-data-table :columns="columns" :data="tableData"> </n-data-table>
</template>
