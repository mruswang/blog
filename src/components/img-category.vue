<template>
  <div class="content" ref="content" :style="{'paddingLeft':isCollapse?'64px':'200px'}">
    <div class="title">
      <h4>图片分类</h4>
      <div>
        <el-button @click="CategoryAdd" type="primary">增加分类</el-button>
      </div>
    </div>
    <div>
      <el-tree
        :data="tree"
        :props="defaultProps"
        accordion
        default-expand-all
        :expand-on-click-node="false"
        :render-content="renderContent"
        >
      </el-tree>
    </div>
    <el-dialog
      title="提示"
      :visible.sync="categoryAdd">
      <el-form :model="form">
        <el-form-item label="父级分类" :label-width="formLabelWidth">
          <el-select v-model="form.region" placeholder="请选择父级分类">
            <el-option label="顶级" value="0"></el-option>
            <el-option v-for="(item, index) in category" :key="index" :label="item.name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="categoryAdd = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      categoryAdd: false,
      form: {
        name: '',
        region: '',
        _id: ''
      },
      formLabelWidth: '120px',
      category: [],
      tree: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
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
      this.getcategory()
    }, 1000)
  },
  methods: {
    formatter (row, column) {
      return row.address
    },
    CategoryAdd () {
      this.categoryAdd = true
      this.form.region = ''
      this.form.name = ''
      this.form._id = ''
    },
    getcategory () {
      this.$http({
        method: 'get',
        url: '/admin/img-category',
        headers: {'token': this.token}
      }).then((res) => {
        this.category = res.data.data
        // 处理成树数据
        this.tree = this.delshu(res.data.data)
      })
        .catch((err) => {
          console.log(err)
        })
    },
    delshu (data) {
      let tree = []
      for (let i in data) {
        if (data[i].parentId === '0') {
          let obj = {
            _id: data[i]._id,
            label: data[i].name,
            parentId: data[i].parentId,
            children: []
          }
          tree.push(obj)
        }
      }
      for (let i in data) {
        for (let j in tree) {
          if (data[i].parentId === tree[j]._id) {
            let objc = {
              _id: data[i]._id,
              label: data[i].name,
              parentId: data[i].parentId
            }
            tree[j].children.push(objc)
          }
        }
      }
      return tree
    },
    remove (data) {
      this.$confirm('此操作将永久删除该项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http({
          method: 'post',
          url: '/admin/img-category-del',
          headers: {'token': this.token},
          data: {_id: data._id}
        }).then((res) => {
          if (res.data.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getcategory()
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
    },
    edit (data) {
      console.log(data)
      this.categoryAdd = true
      this.form.region = data.parentId
      this.form.name = data.label
      this.form._id = data._id
    },
    renderContent (h, { node, data, store }) {
      return (
        <span style="flex: 1; display: flex; align-items: center; font-size: 14px; padding-right: 8px;">
          <span>
            <span>{node.label}</span>
          </span>
          <span>
            <el-button style="font-size: 12px;margin-left:50px;" type="text" on-click={ () => this.edit(data) }>编辑</el-button>
            <el-button style="font-size: 12px;margin-left:10px;" type="text" on-click={ () => this.remove(data) }>删除</el-button>
          </span>
        </span>)
    },
    submit () {
      this.categoryAdd = false
      this.$http({
        method: 'post',
        url: '/admin/img-category-add',
        headers: {'token': this.token},
        data: {
          parentId: this.form.region,
          name: this.form.name,
          _id: this.form._id
        }
      }).then((res) => {
        console.log(res)
        if (res.status === 200) {
          this.$message({
            message: '添加成功',
            type: 'success'
          })
          this.getcategory()
        }
      })
        .catch((err) => {
          console.log(err)
        })
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
