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
      <el-table-column label="操作">
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
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  },
  created () {
    setTimeout(() => {
      this.getlist()
    }, 500)
  },
  methods: {
    formatter (row, column) {
      return row.address
    },
    ziadd () {
      this.$router.push({ path: 'img-add/1' })
    },
    getlist () {
      this.$http.get('/admin/img-list').then((res) => {
        this.tableData = res.data.data
        console.log(this.tableData)
      })
        .catch((err) => {
          console.log(err)
        })
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
        this.$http.post('/admin/img-del', {
          _id: row._id
        })
          .then((res) => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getlist()
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
</style>
