<template>
  <div class="repo">
    <div class="card-list">
      <div class="card" v-for="item in repoList" :key="item.key">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const repoList: any[] = [
      { name: 'shell脚本', key: 1 },
      { name: '代码仓库', key: 2 },
      { name: '学习笔记', key: 3 },
      { name: '技术文档', key: 4 }
    ]
    return {
      repoList
    }
  }
})
</script>
<style lang="less" scoped>
.repo {
  padding: 40px 20px;
  background: #fff;
  height: calc(100vh - 50px);
}
.card-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.card {
  width: 400px;
  height: 200px;
  margin-top: 20px;
  border: solid 1px #ddd;
  margin-right: 20px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
  padding: 20px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}
</style>
