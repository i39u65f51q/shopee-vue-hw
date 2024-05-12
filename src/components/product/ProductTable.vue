<script lang="ts" setup>
import type { SpecificationImg, SpecificationNormal } from '@/classes/Specification'
import type { SpecificationNode, SpecificationTree } from '@/classes/SpecificationTree'
import { useProductsStore } from '@/stores/products'
import { useSpecificationStore } from '@/stores/specifications'
import { onMounted, ref, h } from 'vue'
import { NDataTable, NInput, NButton, createDiscreteApi } from 'naive-ui'
import type { RowData, TableColumn } from 'naive-ui/es/data-table/src/interface'
import { set } from 'lodash'
import { uuid } from 'vue-uuid'
const { message } = createDiscreteApi(['message'])
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
      render: (row: RowData) => {
        return h(NInput, {
          value: row.price.toString(),
          placeholder: '請輸入價格',
          onUpdateValue: v => updatePrice(v, row),
        })
      },
    },
    {
      title: '商品數量',
      key: 'counts',
      rowSpan: () => 1,
      render: (row: RowData) => {
        return h(NInput, {
          value: row.counts.toString(),
          placeholder: '請輸入數量',
          onUpdateValue: v => updateCounts(v, row),
        })
      },
    },
  ]
  columns.value = cols.concat(temp)
}

function updatePrice(newValue: string | number, row: RowData) {
  row.price = newValue
}

function updateCounts(newValue: string | number, row: RowData) {
  row.counts = newValue
}

function updateTableData(trees: SpecificationTree[]): void {
  const rowDataCollection: RowData[] = []
  trees.forEach((tree: SpecificationTree) => {
    const node: SpecificationNode = tree.root
    const collection = getRowDataList(node)
    rowDataCollection.push(...collection)
  })

  function getRowDataList(node: SpecificationNode): RowData[] {
    if (!node.hasChildren()) {
      //最後一層
      const row = { key: uuid.v4(), id: node.uuid, name: node.name, price: node.price, counts: node.counts }
      set(row, node.parentUUid, node.name)
      return [row]
    }
    //接住最後一層的資料
    const totalCollection: RowData[] = []
    node.children.forEach(child => {
      const newCollection = getRowDataList(child) //最後一層的資料
      totalCollection.push(...newCollection)
    })
    totalCollection.forEach(rowData => {
      set(rowData, node.parentUUid, node.name)
    })
    //將最後一層的資料往上層送
    return totalCollection
  }
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

function save(): void {
  tableData.value.forEach((row: RowData) => {
    const { id, price, counts } = row
    for (const tree of products.value) {
      const targetNode = tree.search(tree.root, id)
      if (!targetNode) continue
      targetNode.price = price
      targetNode.counts = counts
    }
  })
  productsStore.replace(products.value)
  message.success('儲存成功')
}

onMounted(() => {
  products.value = productsStore.products
  updateColumns(specificationStore.specificationList as (SpecificationImg | SpecificationNormal)[])
  updateTableData(products.value)
})
</script>
<template>
  <n-data-table :columns="columns" :data="tableData"> </n-data-table>
  <n-button @click="save" type="primary">儲存</n-button>
</template>
<style scoped>
.n-button {
  width: 100%;
}
</style>
