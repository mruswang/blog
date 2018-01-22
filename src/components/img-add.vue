<template>
  <div class="content" ref="content" :style="{'paddingLeft':isCollapse?'64px':'200px'}">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
      <el-form-item label="图片名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="图片分类" prop="category">
        <el-select v-model="value4" clearable placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="图片上传" prop="upload">
        <el-upload
          action="/admin/upload"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove">
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" size="tiny">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </el-form-item>
      <el-form-item label="图片资源" prop="resource">
        <el-radio-group v-model="ruleForm.resource">
          <el-radio label="原创图片"></el-radio>
          <el-radio label="转载图片"></el-radio>
        </el-radio-group>
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
      _id: '',
      ruleForm: {
        name: '',
        resource: '',
        collect: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入图片名称', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择图片分类', trigger: 'change' }
        ],
        upload: [
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
      dialogImageUrl: '',
      dialogVisible: false,
      options: [],
      value4: ''
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
    }, 1000)
  },
  methods: {
    getcategory () {
      this.$http.get('/admin/img-category').then((res) => {
        this.options = this.dealcategory(res.data.data)
        console.log(this.options)
      })
        .catch((err) => {
          console.log(err)
        })
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
          this.$http.post('/admin/img-add',{
            _id: this._id
          }).then((res) => {
            console.log(this.options)
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
</style>
