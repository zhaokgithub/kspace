<template>
  <div class="file">
    <div class="left-menu">
      <div :class="selectMenu === item.key ? 'item item-selected' : 'item'" v-for="item in menus" :key="item.key" @click="handleMenuClick(item.key)">
        {{ item.title }}
      </div>
    </div>
    <div class="right-file">

      <div class="nav">
        <span>{{ getDisplayDir(currentDir) }}</span>
        <div class="action" v-if="[1,2].includes(selectMenu)">
          <a-button type="primary" @click="visible=true">上传文件</a-button>
          <a-button type="primary" style="margin:0px 10px;" @click="createVisible = true">新建目录</a-button>
          <a-button type="primary" @click="handleUpdateLocal">更新本地</a-button>
        </div>
      </div>
      <a-table :dataSource="dataSource" :columns="columns">
        <template #bodyCell="{ column,text,record }">
          <template v-if="column.key === 'name'">
            <span>
              <a @click="handleCheckDir(text)" v-if="record.type === 1">{{ text }}</a>
              <span v-if="record.type !== 1">{{ text }}</span>
            </span>
          </template>
          <template v-if="column.key === 'action'">
            <span>
              <a>Download</a>
              <a-divider type="vertical" />
              <a>Detail</a>
              <a-divider type="vertical" />
              <a>Delete</a>
            </span>
          </template>
        </template>
      </a-table>
    </div>
    <uploadModal v-if="visible" @cancel="handleCloseModal"/>
    <createModal :currentDir="currentDir" v-if="createVisible" @cancel="handleCloseModal"  @create="handleCreateDir"/>
  </div>
</template>
<script>
import { Button, Table, Divider } from 'ant-design-vue'
import { updateLocalFile, queryFileList } from '../../service/file'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import uploadModal from './UploadModel.vue';
import createModal from './CreateModal.vue'
export default {
  setup() {
    const currentDir = ref(['/var/storage','istorage-res'])
    const dataSource = ref([])
    const visible = ref(false)
    const createVisible = ref(false)
    const selectMenu = ref(1)
    const router = useRouter()
    
    const getDisplayDir = (pathList)=>{
      return pathList.filter(path=>path !== '/var/storage').join('/')
    }

    const getFileList = async (pathList) => {
      console.log('get list',pathList.join('/'))
      const res = await queryFileList(pathList.join('/'))
      dataSource.value = res.result
    }

    const handleCloseModal = ()=>{
      console.log('close')
      visible.value = false;
      createVisible.value = false;
    }
    onMounted(() => {
      void getFileList(currentDir.value)
    })
    const handleMenuClick = (value) => {
      selectMenu.value = value
    }
    const handleCreateDir = () => {
      createVisible.value = false;
      getFileList(currentDir.value);
      
    }
    const handleDeleteFile = (item) => {}
    const handleUpdateLocal = async () => {
      const res = await updateLocalFile()
    }
    const handleCheckDir = async (dir) => {
      currentDir.value.push(dir);
      await getFileList(currentDir.value)
    }
    return {
      handleCloseModal,
      handleMenuClick,
      handleCreateDir,
      handleDeleteFile,
      handleUpdateLocal,
      handleCheckDir,
      getDisplayDir,
      currentDir,
      selectMenu,
      visible,
      createVisible,
      dataSource,
      menus: [
        {
          title: '全部文件',
          key: 1
        },
        {
          title: '我的文件',
          key: 2
        },
        {
          title: '我的分享',
          key: 3
        },
        {
          title: '回收站',
          key: 4
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
          key: 'action'
        }
      ]
    }
  },
  components: {
    ATable: Table,
    AButton: Button,
    ADivider: Divider,
    uploadModal,
    createModal
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
    