<template>
  <div class="file">
    <div class="left-menu">
      <div :class="selectMenu === item.key ? 'item item-selected' : 'item'" v-for="item in menus" :key="item.key"
        @click="handleMenuClick(item.key)">
        {{ item.title }}
      </div>
    </div>
    <div class="right-file">

      <div class="nav">
        <span>{{ currentDir }}</span>
        <div class="action" v-if="selectMenu === 1">
          <a-button type="primary">上传文件</a-button>
          <a-button type="primary" style="margin:0px 10px;" @click="handleCreateDir">新建目录</a-button>
          <a-button type="primary" @click="handleUpdateLocal">更新本地</a-button>
        </div>
        <div class="action" v-if="selectMenu === 2">
          <a-button type="primary" @click="handleUpdateLocal">更新本地</a-button>
        </div>
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
import { Button, message, Table, Divider } from 'ant-design-vue'
import { updateLocalFile, queryFileList } from '../../service/file';
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router';
export default {
  setup() {
    const dataSource = ref([])
    const selectMenu = ref(1)
    const router = useRouter();

    const getFileList = async (currentDir = '/var') => {
      const res = await queryFileList(currentDir);
      dataSource.value = res.result
    }
    onMounted(() => {
      void getFileList()
    })
    const handleMenuClick = (value) => {
      selectMenu.value = value
    }
    const handleCreateDir = () => {
      console.log(router)
    }
    const handleDeleteFile = (item) => { }
    const handleDownloadFile = () => { }
    const handleUpdateLocal = async () => {
      message.error('ddd')
      const res = await updateLocalFile();
      console.log(res)
    }
    return {
      currentDir: "istorage-res/",
      selectMenu,
      handleMenuClick,
      handleCreateDir,
      handleDeleteFile,
      handleUpdateLocal,
      dataSource,
      menus: [
        {
          title: '我的文件',
          key: 1
        },
        {
          title: '本地文件',
          key: 2
        },
        {
          title: '我的分享',
          key: 4
        },
        {
          title: '回收站',
          key: 3
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

  .action,
  .nav {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    padding: 0px 10px;
  }
}
</style>
    