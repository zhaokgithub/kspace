<template>
  <div class="layout">
    <div class="header">
      <div class="left">
        <div style="display: flex;align-items: center;">
          <IconLogo />
          <span class="title" @click="handleMenuClick">云盘</span>
        </div>
        <div style="flex:1">
          <a-menu mode="horizontal" @click="handleMenuClick" :selectedKeys="selectedKey">
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
        <a-dropdown>
          <a-avatar :size="32">
            <template #icon>
              <UserOutlined />
            </template>
          </a-avatar>
          <template #overlay>
            <a-menu>
              <a-menu-item>
                <a href="javascript:;" @click="handleLogout">退出登录</a>
              </a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </div>
    </div>
    <div class="layout-content">
      <RouterView />
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
import { UserOutlined } from '@ant-design/icons-vue'
import { Avatar, Menu, MenuItem, Dropdown } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import IconLogo from './icons/IconLogo.vue';
import Cookie from 'js-cookie';

export default {
  data() {
    const router = useRouter()
    return {
      router,
      selectedKey: ['file']
    }
  },
  created() {
    console.log('00000')
  },
  components: {
    UserOutlined,
    AAvatar: Avatar,
    AMenu: Menu,
    AMenuItem: MenuItem,
    ADropdown: Dropdown,
    IconLogo
  },
  methods: {
    handleMenuClick(menu) {
      this.selectedKey = [menu.key]
      const router = useRouter()
      this.$router.push(menu.key)
    },
    handleLogout(){
      Cookie.remove('token');
      this.$router.push('/login');
    }
  }
}
</script>

<style scoped lang="less">
.layout {
  width: 100%;
  height: 100%;
}
.layout-content {
  width: 100%;
  height: 100%;
}
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
  font-size: 18px;
  font-weight: bold;
  margin-right: 50px;
  margin-left: 5px;
}
</style>
