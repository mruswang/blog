<template>
  <div class="content" ref="content" :style="{'paddingLeft':isCollapse?'64px':'200px'}">
    <div class="title">
      <h4>管理员列表</h4>
      <div>
        <el-button @click="adminadd" type="primary">添加管理员</el-button>
      </div>
    </div>
    <el-table
      :data="alldata"
      style="width: 100%"
      :default-sort = "{prop: 'date', order: 'descending'}"
      >
      <el-table-column
        prop="_id"
        label="管理员ID"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="name"
        label="管理员名称"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="email"
        label="电子邮箱"
        sortable
        width="180">
      </el-table-column>
      <el-table-column
        prop="phone"
        label="手机号"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="status"
        label="账号状态"
        sortable
        width="120">
      </el-table-column>
      <el-table-column
        prop="creatime"
        label="创建日期"
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
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      alldata: []
    }
  },
  computed: {
    ...mapGetters([
      'isCollapse',
      'token'
    ])
  },
  created () {
    setTimeout(() => {
      this.getlist()
    }, 500)
  },
  methods: {
    adminadd () {
      this.$router.push({ path: 'admin-add/1' })
    },
    getlist () {
      this.$http({
        method: 'get',
        url: '/admin/admin-list',
        headers: {'token': this.token}
      }).then((res) => {
        this.alldata = res.data.data
        console.log(res)
      })
        .catch((err) => {
          console.log(err)
        })
    },
    handleEdit (index, row) {
      this.$router.push({path: `admin-add/${row._id}`})
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'post',
          url: '/admin/admin-del',
          headers: {'token': this.token},
          data: {_id: row._id}
        }).then((res) => {
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
  .page{
    margin-top: 15px;
  }
</style>
