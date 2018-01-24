<template>
  <div class="content" ref="content" :style="{'paddingLeft':isCollapse?'64px':'200px'}">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
      <el-form-item label="图片名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="图片分类" prop="category">
        <el-select v-model="ruleForm.category" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片上传" prop="dialogImageUrl">
        <ul class="el-upload-list el-upload-list--picture-card" ref="reimg" v-show="editimg">
          <li tabindex="0" class="el-upload-list__item is-success">
            <img :src="ruleForm.dialogImageUrl" alt="" class="el-upload-list__item-thumbnail">
            <label class="el-upload-list__item-status-label">
              <i class="el-icon-upload-success el-icon-check"></i>
            </label>
            <span class="el-upload-list__item-actions">
              <span class="el-upload-list__item-preview">
                <i class="el-icon-zoom-in" @click="check"></i>
              </span>
              <span class="el-upload-list__item-delete">
                <i class="el-icon-delete" @click="removeimg"></i>
              </span>
            </span>
          </li>
        </ul>
        <el-upload
          action="/admin/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove"
          :on-success="changeurl">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="ruleForm.dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="图片资源" prop="resource">
        <div>
          <el-radio-group v-model="ruleForm.resource">
            <el-radio label="原创图片"></el-radio>
            <el-radio label="转载图片"></el-radio>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item label="图片收藏数" prop="collect">
        <el-input type="number" v-model="ruleForm.collect"></el-input>
      </el-form-item>
      <el-form-item label="图片描述" prop="desc">
        <el-input type="textarea" v-model="ruleForm.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      id: '',
      ruleForm: {
        name: '',
        resource: '',
        collect: '',
        desc: '',
        category: '',
        dialogImageUrl: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入图片名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择图片分类', trigger: 'change' }
        ],
        dialogImageUrl: [
          { required: true, message: '请选择图片', trigger: 'change' }
        ],
        resource: [
          { required: true, message: '请选择图片资源', trigger: 'change' }
        ],
        desc: [
          { required: true, message: '请输入图片描述', trigger: 'change' }
        ],
        collect: [
          { required: true, message: '请输入图片收藏数', trigger: 'change' }
        ]
      },
      dialogVisible: false,
      options: [],
      editimg: false
    }
  },
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  },
  created () {
    setTimeout(() => {
      this.getcategory()
      this.getdetail()
    }, 1000)
  },
  methods: {
    getcategory () {
      this.$http.get('/admin/img-category').then((res) => {
        this.options = this.dealcategory(res.data.data)
      })
        .catch((err) => {
          console.log(err)
        })
    },
    getdetail () {
      let _id = this.$route.params.id
      if (_id === '1') {
        this.id = ''
      } else {
        this.id = _id
        this.$http.post('/admin/img-detail', {_id: _id}).then((res) => {
          let data = res.data.data[0]
          this.ruleForm.name = data.name
          this.ruleForm.resource = data.resource
          this.ruleForm.collect = data.collect
          this.ruleForm.desc = data.desc
          this.ruleForm.category = data.category
          this.ruleForm.dialogImageUrl = data.imgurl
          this.editimg = true
          console.log(res)
        })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    dealcategory (data) {
      let newarr = []
      data.map((item, index) => {
        var obj = {
          value: item._id,
          label: item.name
        }
        newarr.push(obj)
      })
      return newarr
    },
    check () {
      this.dialogVisible = true
    },
    removeimg () {
      this.ruleForm.ruleForm = ''
      let children = this.$refs.reimg
      children.parentNode.removeChild(children)
    },
    changeurl (response, file, fileList) {
      this.ruleForm.dialogImageUrl = response.filename
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/admin/img-add', {
            _id: this.id,
            name: this.ruleForm.name,
            category: this.ruleForm.category,
            imgurl: this.ruleForm.dialogImageUrl,
            resource: this.ruleForm.resource,
            collect: this.ruleForm.collect,
            desc: this.ruleForm.desc
          }).then((res) => {
            if (res.status === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$router.push({ path: '/img-list' })
            }
          })
            .catch((err) => {
              console.log(err)
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    }
  }
}
</script>

<style>
  .content{
    padding-top: 60px;
  }
  .demo-ruleForm{
    margin-top:20px;
    width:90%;
  }
  .el-form-item__content{
    display: flex;
  }
</style>
