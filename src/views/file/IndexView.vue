<template>
  <div class="file">
    <div class="left-menu">
      <div :class="selectMenu === item.key ? 'item item-selected' : 'item'" v-for="item in menus">
      {{ item.title }}
      </div>
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
import axios from 'axios'
import { onMounted, ref } from 'vue'
export default {
  setup() {
    const dataSource = ref([])
    const selectMenu = ref(1)

    const queryFileList = (currentDir = '/var/storage/istorage-res') => {
      const path = `/api/file/list/?currentDir=${currentDir}`
      axios
        .get(path)
        .then((res) => {
          console.log('res: ', res)
          if (res && res.data.code === 1) {
            dataSource.value = res.data.result
          }
        })
        .catch((e) => {
          console.log(e)
        })
    }
    onMounted(() => {
      queryFileList()
    })
    const handleMenuClick=()=>{}
    return {
      selectMenu,
      handleMenuClick,
      dataSource,
      menus:[
        {
          title:'全部文件',
          key: 1
        },
        {
          title:'文档',
          key: 2
        },
        {
          title:'图片',
          key: 3
        },
        {
          title:'音频',
          key: 4
        },
        {
          title:'视频',
          key: 5
        },
        {
          title:'回收站',
          key: 6
        },
        {
          title:'我的分享',
          key: 7
        },
      ],
      columns: [
        {
          title: '文件名',
          dataIndex: 'name',
          key: 'name'
        },
        {
          title: '文件大小',
          dataIndex: 'size',
          key: 'size'
        },
        {
          title: '修改时间',
          dataIndex: 'createTime',
          key: 'createTime'
        }
      ]
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
.left-menu {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 200px;
  padding: 10px 10px;

  .item {
    cursor: pointer;
    height: 60px;
    font-size: 16px;
    width: 100%;
    text-align: center;
    line-height: 60px;
  }
  .item-selected {
    font-weight: bold;
    color: #3780f7;
    background: #e9e9e9;
  }
}
.right-file {
  flex: 1;
  .action {
    height: 50px;
    display: flex;
    align-items: center;
    background: #fff;
    padding: 0px 10px;
  }
}
</style>
    