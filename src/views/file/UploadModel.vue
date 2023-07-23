<template>
  <a-modal title="文件上传" :visible="true" @cancel="handleClose" @ok="handleUpload" cancelText="取消" okText="确认">
    <div>
      <a-upload-dragger v-model:fileList="fileList" name="file" :multiple="true"
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76" @change="handleChange" @drop="handleDrop">
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">点击或拖拽文件到此处上传</p>
        <p class="ant-upload-hint">
          支持任意文件类型上传，支持多个文件同时上传，文件大小无限制！
        </p>
      </a-upload-dragger>
    </div>
  </a-modal>
</template>
<script >
import { Modal } from 'ant-design-vue'
export default {
  data(){
    return {

    }
  },
  components: {
    AModal: Modal
  },
  
  methods: {
    handleClose(){
      console.log('dddd')
      this.$emit('cancel')
    },
    handleUpload: () => {

    }
  }
}
</script>
<style lang="less" scoped></style>