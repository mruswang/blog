<template>
  <div id="app">
    <admin v-if="is_login===true"></admin>
    <login v-else></login>
  </div>
</template>

<script>
import login from 'components/login'
import admin from 'components/admin'
export default {
  data () {
    return {
      is_login: true,
      isCollapse: false
    }
  },
  components: {
    login, admin
  }
}
</script>

<style>
body{
  margin:0;
}
#app {
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}
</style>
