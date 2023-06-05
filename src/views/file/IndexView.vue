<template>
  <div class="file">
    <h1>file</h1>
    <a-table :dataSource="dataSource" :columns="columns" />
  </div>
</template>
<script>
import { Button, Input, Table } from 'ant-design-vue'

export default {
  setup() {
    return {
      dataSource: [
        {
          key: '1',
          name: '胡彦斌.mp4',
          size: 32,
          address: '西湖区湖底公园1号',
        },
        {
          key: '2',
          name: '胡彦祖',
          size: 42,
          address: '西湖区湖底公园1号',
        },
      ],

      columns: [
        {
          title: '文件名',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: '文件大小',
          dataIndex: 'size',
          key: 'size',
        },
        {
          title: '修改时间',
          dataIndex: 'updateTime',
          key: 'updateTime',
        },
      ],
    }
  },
  components: {
    ATable: Table
  }
}
</script>
<style lang="less">
.file {
  width: 100%;
  height: 100%;
}
</style>
    