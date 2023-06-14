<template>
  <div class="layout">
    <div class="header">
      <div class="left">
        <span class="title" @click="handleMenuClick">Kpan</span>
        <div style="flex:1">
          <a-menu mode="horizontal" @click="handleMenuClick">
            <a-menu-item key="file">
              <template #icon>
                <PieChartOutlined />
              </template>
              <span>文件仓库</span>
            </a-menu-item>
            <a-menu-item key="repo">
              <template #icon>
                <DesktopOutlined />
              </template>
              <span>我的知识库</span>
            </a-menu-item>
          </a-menu>
        </div>
      </div>
      <div style="cursor:pointer;">
        <a-avatar :size="32">
          <template #icon>
            <UserOutlined />
          </template>
        </a-avatar>
      </div>
    </div>
    <div>
      <RouterView />
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
import { UserOutlined } from '@ant-design/icons-vue';
import { Avatar, Menu, MenuItem, Dropdown } from 'ant-design-vue';
import { useRouter } from 'vue-router'
export default {
  data() {
    const router = useRouter();
    return {
      router,
      test:'demo'
    }
  },
  components: {
    UserOutlined,
    AAvatar: Avatar,
    AMenu: Menu,
    AMenuItem: MenuItem,
    Dropdown: Dropdown
  },
  methods: {
    handleMenuClick(menu) {
      const router = useRouter();
      console.log(menu)
      console.log(this.router)
      this.$router.push(menu.key)

    }
  }
}
</script>

<style scoped lang="less">
.layout {}

.header {
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  border-bottom: 1px solid #e4e6eb;

  .left {
    display: flex;
    align-items: center;
  }
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-right: 50px;
}
</style>
