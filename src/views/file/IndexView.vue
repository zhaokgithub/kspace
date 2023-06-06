<template>
  <div class="file">
    <div class="left-menu">
      <div class="item item-selected">全部文件</div>
      <div class="item">文档</div>
      <div class="item">图片</div>
      <div class="item">音频</div>
      <div class="item">视频</div>
      <div class="item">其他</div>

      <div class="item">我的分享</div>
      <div class="item">回收站</div>
    </div>
    <div class="right-file">
      <div class="action">
        <a-button type="primary">上传文件</a-button>
        <a-button type="ghost" style="margin-left: 10px;">新建目录</a-button>
      </div>
      <a-table :dataSource="dataSource" :columns="columns" />
    </div>
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
        {
          key: '2',
          name: '胡彦祖',
          size: 42,
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
    ATable: Table,
    AButton: Button
  }
}
</script>
<style lang="less">
.file {
  width: 100%;
  height: 100%;
  display: flex;
}
.left-menu{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 200px;
  padding: 10px 10px;

  .item{
    cursor: pointer;
    height: 60px;
    font-size: 16px;
    width: 100%;
    text-align: center;
    line-height: 60px;
  }
  .item-selected{
    font-weight: bold;
    color: #3780f7;
    background: #e9e9e9;
  }
}
.right-file{
  flex: 1;
  .action{
    height: 50px;
    display: flex;
    align-items: center;
    background: #fff;
    padding: 0px 10px;
  }
}
</style>
    