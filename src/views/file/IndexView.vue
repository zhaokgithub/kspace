<template>
  <div class="file">
    <div class="left-menu" v-if="!isMobile">
      <div :class="selectMenu === item.key ? 'item item-selected' : 'item'" v-for="item in menus" :key="item.key"
        @click="handleMenuClick(item.key)">
        <span v-if="item.icon">{{ item.icon }}</span>
        <span style="font-size:12px;">{{ item.title }}</span>
      </div>
    </div>
    <div class="right-file" v-if="!isMobile">
      <div class="nav">
        <div class="action" v-if="[1, 2].includes(selectMenu)">
          <a-upload name="file" :customRequest="handleFileUpload" :showUploadList="false" multiple>
            <div class="button" @click="openUploadModal">
              <UploadOutlined />
              上传
            </div>
          </a-upload>
          <div class="button-ghost" style="font-weight:bold;margin: 0px 10px" @click="openCreateDirModal">
            <FolderAddOutlined />
            新建文件夹
          </div>
          <div class="button-ghost" style="font-weight:bold;" @click="handleUpdateLocal">更新本地文件</div>
          <div class="button-ghost" style="font-weight:bold;margin-left: 10px;" @click="handleDeleteFile">删除文件</div>
        </div>
        <div class="search">
          <a-input-search v-model:value="value" placeholder="搜索我的文件" style="width: 200px;border-radius: 10px;" />
        </div>
      </div>
      <div className="bc">
        <a-breadcrumb separator=">">
          <a-breadcrumb-item key="all">
            <span style="cursor:pointer;" @click="handleClickBc(1, 2)">全部文件</span>
          </a-breadcrumb-item>
          <a-breadcrumb-item v-for="(item, index) in currentDir.filter(item=>!!item)" :key="index">
            <a @click="handleClickBc(item, 2)">{{ item }}</a>
          </a-breadcrumb-item>

        </a-breadcrumb>
      </div>
      <div class="file-list">
        <a-table :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }" @change="handleChange"
          :dataSource="dataSource" :columns="columns" :pagination="pagination" :size="'small'">
          <template #bodyCell="{ column, text, record }">
            <template v-if="column.key === 'fileName'">
              <span>
                <FolderOpenOutlined v-show="record.fileType === 1" style="color:#faad14;margin-right: 4px;" />
                <FileImageOutlined v-show="record.fileType === 2" style="color:#ff7875;margin-right: 4px;" />
                <a @click="handleCheckDir(text)" v-if="record.fileType === 1">{{ text }}</a>
                <span v-if="record.fileType !== 1">{{ text }}</span>
              </span>
            </template>
            <template v-if="column.key === 'size' && record.fileType !== 1">
              <span> {{ text && formatFileSize(text) }}M </span>
            </template>
            <template v-if="column.key === 'createTime'">
              <span>
                {{ text && dayjs(new Date(text)).format('YYYY/MM/DD HH:mm') }}
              </span>
            </template>
          </template>
        </a-table>
      </div>
    </div>
    <div class="mobile-right-file" v-if="isMobile">
      <a-table @change="handleChange" :dataSource="dataSource" :columns="columns" :pagination="pagination"
        :size="'small'">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.key === 'fileName'">
            <span>
              <a @click="handleCheckDir(text)" v-if="record.fileType === 1">{{ text }}</a>
              <span v-if="record.fileType !== 1">{{ text }}</span>
            </span>
          </template>
          <template v-if="column.key === 'size'">
            <span> {{ text && formatFileSize(text) }}M </span>
          </template>
          <template v-if="column.key === 'createTime'">
            <span>
              {{ text && dayjs(new Date(text)).format('YYYY/MM/DD HH:mm') }}
            </span>
          </template>
        </template>
      </a-table>
    </div>
    <div class="mobile-footer" v-if="isMobile">
      <a-upload name="file" :capture="null" :customRequest="handleFileUpload" :showUploadList="false" multiple>
        <div @click="openUploadModal">
          <UploadOutlined />
          上传文件
        </div>
      </a-upload>
    </div>
    <createModal :currentDir="currentDir" v-if="createVisible" @cancel="handleCloseModal" @create="handleCreateDir" />
  </div>
</template>
<script>
import { updateLocalFile, queryFileList, getPresignedFileURL, uploadCloudFile, deleteCloudFile } from '../../service/file'
import { onMounted, ref, getCurrentInstance } from 'vue'
import dayjs from 'dayjs'
import createModal from './CreateModal.vue'
import { useI18n } from 'vue-i18n';
import { FolderAddOutlined, UploadOutlined, FolderOpenOutlined, FileImageOutlined } from '@ant-design/icons-vue';
import axios from 'axios';
import { message } from 'ant-design-vue';

export default {
  setup(props) {
    const { t } = useI18n() // 解构出t方法
    const currentDir = ref([])
    const dataSource = ref([])
    const selectedRowKeys = ref([])
    const visible = ref(false)
    const createVisible = ref(false)
    const selectMenu = ref(1)
    const pagination = ref({ total: 0, page: 1, pageSize: 10 })
    const globalConfig = getCurrentInstance()?.appContext.config.globalProperties;

    const formatFileSize = (size) => {
      return (size / 1000 / 1024).toFixed('2')
    }

    const getFileList = async (type = 1, pageInfo = {}) => {
      const pathList = currentDir.value;
      const page = pageInfo?.current ? pageInfo?.current : pagination.value.page
      const pageSize = pageInfo?.pageSize ? pageInfo.pageSize : pagination.value.pageSize
      const params = { bucketName: "istorage-res", currentDir: pathList.join('/'), pageSize, page }
      const res = await queryFileList(params)
      const list = res?.data?.list || [];
      dataSource.value = list.map(item => {
        item.key = item._id;
        return item
      });
      pagination.value = { total: res?.data?.total, page: res?.data?.page, pageSize }
    }

    const handleCloseModal = () => {
      visible.value = false
      createVisible.value = false
    }
    onMounted(() => {
      void getFileList()
    })
    const handleMenuClick = (value) => {
      selectMenu.value = value
      void getFileList(value)
    }
    const handleCreateDir = () => {
      createVisible.value = false
      getFileList()
    }

    const handleDeleteFile = async (item) => {
      console.log(selectedRowKeys);
      const res = await deleteCloudFile({ fileIds: selectedRowKeys.value })
      if (res && res.code === 1) {
        message.warning("文件删除成功！");
        void getFileList()
      }
      console.log('res: ', res);
    }

    const handleDownloadFile = async (item) => {
      const url = `${location.origin}/api/file/download/?filePath=${item.path}&fileName=${item.realName}`
      window.open(url)
    }

    const handleClickBc = async (val) => {
      const index = currentDir.value.findIndex(v=>v==val);
      currentDir.value = currentDir.value.filter((dir, i) => (index+1) > i)
      await getFileList(1, { current: 1 })
    }
    const handleCheckDir = async (text, type = 1) => {
      if (type === 1) {
        currentDir.value.push(text)
      }
      if (type === 2) {
        currentDir.value = currentDir.value.filter((dir, i) => text > i || text === i)
      }

      await getFileList({ current: 1 })
    }
    const handleChange = (pagination) => {
      getFileList( 1, pagination)
    }

    const openUploadModal = () => {
      visible.value = true
    }

    const openCreateDirModal = () => {
      createVisible.value = true
    }

    const handleFileUpload = async (fileData) => {
      const file = fileData.file;
      const dir = currentDir.value?.filter(dir => !!dir).join('/');
      const fileName = `${dir}/${encodeURIComponent(file.name)}`
      const presignedUrl = await getPresignedFileURL(fileName)
      try {
        if (!presignedUrl) return;
        const config = {
          method: 'put',
          url: presignedUrl,
          data: fileData.file
        };
        const res = await axios(config);
        if (res && res.status === 200) {
          const size = file.size;
          const fileName = file.name;
          const type = file.type;
          const data = { size, fileName, type, currentDir: dir };
          await uploadCloudFile(data)
          void getFileList()
        }
      } catch (e) {
        console.log('e: ', e);
      }
    }

    const onSelectChange = (keys) => {
      console.log('selectedRowKeys changed: ', keys);
      selectedRowKeys.value = keys;
    };
    return {
      isMobile: globalConfig.isMobile,
      dayjs,
      handleChange,
      formatFileSize,
      handleCloseModal,
      handleMenuClick,
      handleClickBc,
      handleCreateDir,
      handleDeleteFile,
      handleDownloadFile,
      handleFileUpload,
      handleCheckDir,
      onSelectChange,
      openUploadModal,
      openCreateDirModal,
      currentDir,
      selectMenu,
      visible,
      createVisible,
      dataSource,
      selectedRowKeys,
      pagination,
      menus: [
        {
          title: '全部文件',
          key: 1
        },
        {
          title: '图片',
          key: 2
        },
        {
          title: '文档',
          key: 3
        },
        {
          title: '视频',
          key: 4
        },
        {
          title: '音频',
          key: 5
        },
        {
          title: '其他',
          key: 6
        }
      ],
      columns: [
        {
          title: '文件名',
          dataIndex: 'fileName',
          key: 'fileName'
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
    createModal,
    FolderAddOutlined,
    UploadOutlined,
    FolderOpenOutlined,
    FileImageOutlined
  }
}
</script>
<style lang="less">
.file {
  width: 100%;
  height: 100%;
  display: flex;
}

.file>.left-menu {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  width: 200px;
  padding: 10px 10px;
  background: #fff;
  border-right: 1px solid #f1f2f4;

  span {
    color: rgb(99, 109, 126);
  }

  .item {
    cursor: pointer;
    height: 50px;
    font-size: 16px;
    width: 100%;
    text-align: center;
    line-height: 50px;
    margin-bottom: 5px;

    &:hover {
      border-radius: 10px;
      background: #f5f5f5;
    }

  }

  .item-selected {
    font-weight: bold;
    background: #eef9fe;
    border-radius: 10px;

    span {
      color: #06a7ff;
    }
  }
}

.right-file {
  flex: 1;
  background: #fff;

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

.button {
  border-radius: 20px;
  background: #06a7ff;
  padding: 4px 16px;
  min-width: 60px;
  text-align: center;
  color: #fff;
  cursor: pointer;
}

.button-ghost {
  border-radius: 20px;
  background: #e6f7ff;
  padding: 4px 16px;
  min-width: 60px;
  text-align: center;
  color: #06a7ff;
  cursor: pointer;
}

.bc {
  padding: 10px 8px;
  background: #fff;
}

.file-list {
  height: calc(100% - 100px);
  overflow: auto;
}

//mobile
.mobile-right-file {
  width: 100%;
  margint-top: 8px;
  height: calc(100% - 130px);
  overflow: auto;
  background: #fff;
}

.mobile-footer {
  position: fixed;
  bottom: 0px;
  z-index: 1000;
  height: 50px;
  width: 100vw;
  background: #fff;
  display: flex;
  align-items: center;
  padding: 0px 16px;
  justify-content: center;
}
</style>
    