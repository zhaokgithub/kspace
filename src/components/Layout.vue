<template>
  <div class="layout">
    <div class="header">
      <span class="title">Kpan</span>
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
import {Avatar} from 'ant-design-vue';
import { defineComponent } from 'vue';
export default defineComponent({
  components: {
    UserOutlined,
    AAvatar:Avatar
  },
});
</script>

<style scoped>
.layout {}

.header {
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0px 20px;
  border-bottom: 1px solid #e4e6eb;
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
}
</style>
