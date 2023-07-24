<template>
    <a-modal title="新建目录" :visible="true" @cancel="handleClose" @ok="handleCreateDir" cancelText="取消" okText="确认">
        <a-form ref="formRef" :model="formState" name="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }"
            autocomplete="off">
            <a-form-item label="目录名" name="directory" :rules="[{ required: true, message: '请输入目录名!' }]">
                <a-input v-model:value="formState.directory" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>
<script >
import { uploadCloudFile } from '../../service/file'
import { reactive, ref } from 'vue';
const formRef = ref();

export default {
    data() {
        return {
            formRef,
            formState: {
                directory: '',
            }
        }
    },
    props: {
        currentDir: {
            type: Array,
        }
    },
    methods: {
        handleClose() {
            this.$emit('cancel')
        },
        async handleCreateDir() {
            const dirName = this.formState.directory;
            const data = {
                currentDir: `${this.currentDir.join('/')}`,
                fileName: dirName,
                fileType: 1
            }
            if (!dirName) {
                this.$message.warning("请输入目录名！")
                return
            }
            const res = await uploadCloudFile(data)
            if (res && res.code === 1) {
                this.$message.success('目录创建成功！');
                this.$emit('create')
            } else {
                this.$message.error(res.msg || "目录创建失败！");
            }
        }
    }
}
</script>
