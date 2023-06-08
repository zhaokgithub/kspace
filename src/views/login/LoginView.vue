<template>
  <div class="login">
    <div class="login-card">
      <h1>Welcome to Kpan</h1>
      <div class="form">
        <div class="item">
          <p>Account</p>
          <a-input v-model:value="account" placeholder="Please input account"  size="large"/>
        </div>
        <div class="item">
          <p>Password</p>
          <a-input v-model:value="password" placeholder="Please input password" size="large"/>
        </div>
      </div>
      <div class="footer">
        <a-button @click="login" style="width:100%" type="primary" size="large">Login</a-button>
        <div style="margin-top:10px;display:flex;justify-content: space-between;">
          <a>I forgot my password</a>
          <a>Register</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Button, Input } from 'ant-design-vue'
const ButtonGroup = Button.Group
export default {
  data(){
    return {
      account:'',
      password: ''
    }
  },
  components: {
    AButton: Button,
    AInput: Input
  },
  mounted() {
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
    background: #ececec9c !important;
  }
  .login {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 200px;
  }
  .login-card {
    padding-top: 40px;
    cursor: pointer;
    border: solid 1px #ddd;
    width: 400px;
    height: 100%;
    border-radius: 10px;
    box-shadow: 0 0 25px rgb(0 0 0 / 7%);
    background: #fff;
    display: flex;
    flex-direction: column;
    padding-bottom: 20px;
    padding-left: 40px;
    padding-right: 40px;
    .form {
      flex: 1;
      .item {
        margin-top: 20px;
      }
    }
    h1 {
      text-align: center;
    }
    .footer {
      width: 100%;
      margin-top: 20px;
      margin-bottom: 20px;
    }
  }
}
</style>
  