<template>
  <div class="file">
    <div class="left-menu">
      <div :class="selectMenu === item.key ? 'item item-selected' : 'item'" v-for="item in menus" :key="item.key" @click="handleMenuClick(item.key)">
        {{ item.title }}
      </div>
    </div>
    <div class="right-file">
      <div class="action">
        <a-button type="primary">Upload</a-button>
        <a-button type="ghost" style="margin-left: 10px;" @click="handleCreateDir">Create Diretory</a-button>
      </div>
      <div class="nav">
        All Files
      </div>
      <a-table :dataSource="dataSource" :columns="columns">
        <template #bodyCell="{ column }">
          <template v-if="column.key === 'action'">
            <span>
              <a>Download</a>
              <a-divider type="vertical" />
              <a>Detail</a>
              <a-divider type="vertical" />
              <a>Delete</a>
              <a-divider type="vertical" />
            </span>
          </template>
        </template>
      </a-table>
    </div>
  </div>
</template>
<script>
import { Button, Input, Table, Divider } from 'ant-design-vue'
import request from '../../service/request';
import { onMounted, ref } from 'vue'
import {useRouter} from 'vue-router';
export default {
  setup() {
    const dataSource = ref([])
    const selectMenu = ref(1)
    const router = useRouter();

    const queryFileList =async (currentDir = '/var/storage/istorage-res') => {
      const path = `/file/list/?currentDir=${currentDir}`
      const res = await request.get(path);
      dataSource.value = res.data.result
    }
    onMounted(() => {
      void queryFileList()
    })
    const handleMenuClick = (value) => {
      console.log('value: ', value)
      selectMenu.value = value
    }
    const handleCreateDir = () => {
      console.log('ddd')
      console.log(useRouter())
      console.log(router)
    }
    const handleDeleteFile = (item) => {}
    const handleDownloadFile = () => {}
    return {
      selectMenu,
      handleMenuClick,
      handleCreateDir,
      handleDeleteFile,
      dataSource,
      menus: [
        {
          title: 'All Files',
          key: 1
        },
        {
          title: 'Documents',
          key: 2
        },
        {
          title: 'Images',
          key: 3
        },
        {
          title: 'Audios',
          key: 4
        },
        {
          title: 'Videos',
          key: 5
        },
        {
          title: 'Recycle Bin',
          key: 6
        },
        {
          title: 'My Share',
          key: 7
        }
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
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
        }
      ]
    }
  },
  components: {
    ATable: Table,
    AButton: Button,
    ADivider: Divider
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
    height: 50px;
    font-size: 16px;
    width: 100%;
    text-align: center;
    line-height: 50px;
    margin-bottom: 5px;
    &:hover {
      background: #e9e9e9;
    }
  }
  .item-selected {
    font-weight: bold;
    color: #3780f7;
    background: #e9e9e9;
  }
}
.right-file {
  flex: 1;
  .action,.nav {
    height: 50px;
    display: flex;
    align-items: center;
    background: #fff;
    padding: 0px 10px;
  }
}
</style>
    