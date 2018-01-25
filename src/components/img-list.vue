<template>
  <div class="content" ref="content" :style="{'paddingLeft':isCollapse?'64px':'200px'}">
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
        prop="_id"
        label="图片ID"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        label="图片"
        sortable
        width="80">
        <template slot-scope="scope">
          <img width="60" :src="scope.row.imgurl" alt="">
        </template>
      </el-table-column>
      <el-table-column
        prop="name"
        label="图片名称"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="resource"
        label="图片来源"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="collect"
        label="收藏数"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="category_name"
        label="图片分类"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="creatime"
        label="创建日期"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="updatetime"
        label="修改日期"
        sortable
        width="180">
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination class="page"
      background
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      @current-change="handleCurrentChange">
    </el-pagination>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      alldata: [],
      total: 0,
      currentPage: 1,
      pageSize: 5
    }
  },
  computed: {
    ...mapGetters([
      'isCollapse',
      'token'
    ]),
    tableData () {
      return this.tablePagination(this.alldata)
    }
  },
  created () {
    setTimeout(() => {
      this.getlist()
    }, 500)
  },
  methods: {
    ziadd () {
      this.$router.push({ path: 'img-add/1' })
    },
    getlist () {
      this.$http({
        method: 'get',
        url: '/admin/img-list',
        headers: {'token': this.token}
      }).then((res) => {
        this.alldata = res.data.data
      })
        .catch((err) => {
          console.log(err)
        })
    },
    tablePagination (data) {
      let array = []
      let startNum = 0
      let endNum = 0
      this.total = data.length
      startNum = (this.currentPage - 1) * this.pageSize
      if (this.currentPage * this.pageSize < this.total) {
        endNum = this.currentPage * this.pageSize
      } else {
        endNum = this.total
      }
      array = data.slice(startNum, endNum)
      return array
    },
    handleCurrentChange (val) {
      this.currentPage = val
    },
    handleEdit (index, row) {
      this.$router.push({path: `img-add/${row._id}`})
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'post',
          url: '/admin/img-del',
          headers: {'token': this.token},
          data: {_id: row._id}
        }).then((res) => {
          if (res.data.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getlist()
          } else {
            this.$message({
              type: 'info',
              message: res.data.message
            })
          }
        })
          .catch((err) => {
            console.log(err)
          })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style>
  .content{
    padding-top: 60px;
  }
  .title{
    text-align:left;
    padding: 0 15px;
  }
  .el-table th>.cell{
    text-align:center
  }
  .page{
    margin-top: 15px;
  }
</style>
