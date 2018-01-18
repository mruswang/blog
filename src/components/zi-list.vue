<template>
  <div class="content" ref="content">
    <el-container>
      <el-main>
        zi-list
      </el-main>
    </el-container>
  </div>
</template>
<style>
  .el-aside {
    color: #333;
  }
  .content{
    padding-left: 180px;
    padding-top: 60px;
  }
</style>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    const item = {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄'
    }
    return {
      tableData: Array(20).fill(item)
    }
  },
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  },
  watch: {
    isCollapse (newCollapse) {
      if (newCollapse) {
        this.$refs.content.style.paddingLeft = '46PX'
      } else {
        this.$refs.content.style.paddingLeft = '180PX'
      }
    }
  }
}
</script>
