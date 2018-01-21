<template>
  <div class="content" ref="content">
    <div class="title">
      <h4>图片列表</h4>
      <div>
        <el-button @click="ziadd" type="primary">发布图片</el-button>
      </div>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="date"
        label="日期"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="图片"
        sortable
        width="80">
      </el-table-column>
      <el-table-column
        prop="name"
        label="图片名称"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="图片来源"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="收藏数"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址"
        :formatter="formatter">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            >编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      tableData: [{
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  },
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  },
  methods: {
    formatter (row, column) {
      return row.address
    },
    ziadd () {
      this.$router.push({ path: 'img-add' })
    }
  },
  watch: {
    isCollapse (newCollapse) {
      if (newCollapse) {
        this.$refs.content.style.paddingLeft = '46PX'
      } else {
        this.$refs.content.style.paddingLeft = '200PX'
      }
    }
  }
}
</script>

<style>
  .content{
    padding-left: 200px;
    padding-top: 60px;
  }
  .title{
    text-align:left;
    padding: 0 15px;
  }
  .el-table th>.cell{
    text-align:center
  }
</style>
