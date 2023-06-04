<template>
  <div class="login">
    <div class="login-card">
      <h1>Login to Kpan</h1>
      <div class="form">
        <div>
          <Input />
        </div>
        <div>
          <Input />
        </div>
      </div>
      <a-button>Login</a-button>
    </div>
  </div>
</template>
<script>
import { Button,Input } from 'ant-design-vue'
const ButtonGroup = Button.Group
export default {
  components: {
    AButton: Button,
    AInput: Input
  },
  mounted() {
    this.login()
  },
  methods: {
    login() {
      console.log('login')
    }
  }
}
</script>
<style lang="less">
@media (min-width: 1024px) {
  body {
    background: #ebeff5 !important;
  }
  .login {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .login-card {
    padding-top: 10px;
    cursor: pointer;
    border: solid 1px #ddd;
    width: 400px;
    height: 500px;
    border-radius: 10px;
    box-shadow: 0 0 25px rgb(0 0 0 / 7%);
    background: #fff;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    padding-left: 40px;
    padding-right: 40px;
    .form{
      flex: 1;
    }
    h1 {
      text-align: center;
    }
  }
}
</style>
  