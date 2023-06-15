<template>
  <div class="repo">
    <div class="card"  v-for="item in repoList" :key="item.key">
    {{ item.name }}
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const repoList:any[] = [
      {name:"shell脚本",key:1},
      {name:"代码仓库",key:2},
      {name:"学习笔记",key:3},
      {name:"技术文档",key:4},
    ]
    return {
      repoList
    }
  },
})
</script>
<style lang="less" scoped>
.repo{
  padding: 10px;
  background: #fff;
  height: 100%;
  display: flex;
}
.card{
  width: 400px;
  height: 200px;
  border: solid 1px #ddd;
  margin-right: 10px;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  font-size: 22px;
  cursor: pointer;
  padding: 20px;
}
</style>
