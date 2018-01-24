<template>
  <div id="app">
    <admin v-if="islogin===true"></admin>
    <login v-else></login>
  </div>
</template>

<script>
import login from 'components/login'
import admin from 'components/admin'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'islogin'
    ])
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
