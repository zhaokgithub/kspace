<template>
  <div class="layout">
    <div class="header">
      <div class="left">
        <div style="display: flex;align-items: center;">
          <IconLogo />
          <span class="title" @click="handleMenuClick">{{ $t('file.title') }}</span>
        </div>
      </div>
      <div style="cursor:pointer;display:flex;align-items:center;">
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
        <span class="setting ml-12">
          <SettingOutlined style="font-size:20px;color:#a5a4a4;cursor:point;" />
        </span>
      </div>
    </div>
    <div class="layout-content">
      <div class="left-menu" v-show="!isMobile">
        <a-menu @click="handleMenuClick" :selectedKeys="selectedKey" style="width:80px;">
          <a-menu-item key="file" class="menu-item">
            <HomeOutlined />
            <span style="line-height:20px;margin:5px 0px 0px;">首页</span>
          </a-menu-item>
          <a-menu-item key="repo" class="menu-item">
            <FolderOutlined />
            <span style="line-height:20px;margin:5px 0px 0px;">资料库</span>
          </a-menu-item>
        </a-menu>
      </div>
      <RouterView />
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
import { Avatar, Menu, MenuItem, Dropdown } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import IconLogo from './icons/IconLogo.vue';
import Icon, {UserOutlined, SettingOutlined, HomeOutlined, FolderOutlined } from '@ant-design/icons-vue';
import { onMounted, ref, getCurrentInstance } from 'vue'

export default {
  data() {
    const router = useRouter()
    const globalConfig = getCurrentInstance()?.appContext.config.globalProperties;
    console.log('-----globalConfig: ', globalConfig);

    return {
      router,
      selectedKey: ['file'],
      isMobile: globalConfig.isMobile
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
    IconLogo,
    SettingOutlined,
    HomeOutlined,
    FolderOutlined
  },
  methods: {
    handleMenuClick(menu) {
      this.selectedKey = [menu.key]
      const router = useRouter()
      this.$router.push(menu.key)
    },
    handleLogout() {
      sessionStorage.removeItem('token');
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
  height: calc(100% - 50px);
  display: flex;
  flex-direction: row;

  .left-menu {
    display: flex;
    width: 79px;
    height: 100%;
    background: #fff;
    flex-direction: column;
    padding: 0px;
    align-items: flex-start;
    box-shadow: 0 3px 10px 0 rgba(0, 0, 0, .06);
    border-right: 1px solid #f1f2f4;
    z-index: 2;

    :deep(.ant-menu){
      background: none;
    }

    :deep(.ant-menu-item-selected) {
      background: none;
      .span{
        color: #06a7ff !important;
      }
    }

    :deep(.menu-item) {
      padding: 0px !important;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 60px;
      border: none;
      background: none;
    }

    :deep(.ant-menu-title-content) {
      margin-left: 0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 60px;
    }
  }

}

.header {
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  padding-left: 50px;
  box-shadow: -7px 3px 10px 0 rgba(0,0,0,.06);
  position: relative;
  z-index: 100;

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

.setting {}
</style>
