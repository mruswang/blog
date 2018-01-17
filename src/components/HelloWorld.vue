<template>
  <div class="content" ref="content">
    <el-container>
      <el-main>
        <el-table :data="tableData">
          <el-table-column prop="date" label="日期" width="140">
          </el-table-column>
          <el-table-column prop="name" label="姓名" width="120">
          </el-table-column>
          <el-table-column prop="address" label="地址">
          </el-table-column>
        </el-table>
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
