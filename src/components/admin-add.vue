<template>
  <div class="content" ref="content" :style="{'paddingLeft':isCollapse?'64px':'200px'}">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
      <el-form-item label="管理员名称" prop="name">
        <el-input type="text" v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="电子邮箱" prop="email">
        <el-input type="email" v-model="ruleForm.email"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input type="number" v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input type="password" :disabled="disabled" v-model="ruleForm.pass"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <div>
          <el-radio-group v-model="ruleForm.status">
            <el-radio label="启用"></el-radio>
            <el-radio label="禁用"></el-radio>
          </el-radio-group>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button v-show="!disabled" @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import sha1 from 'js-sha1'
export default {
  data () {
    let validateEmail = (rule, value, callback) => {
      if (!(/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(value))) {
        callback(new Error('请输入正确的邮箱'))
      } else {
        callback()
      }
    }
    let validatePhone = (rule, value, callback) => {
      if (!(/^1[3|4|5|8][0-9]\d{4,8}$/.test(value))) {
        callback(new Error('请输入正确的手机号码'))
      } else {
        callback()
      }
    }
    return {
      id: '',
      ruleForm: {
        name: '',
        email: '',
        phone: '',
        status: '',
        pass: ''
      },
      disabled: false,
      rules: {
        name: [
          { required: true, message: '请输入管理员名称', trigger: 'blur' },
          { min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入电子邮箱', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请选择状态', trigger: 'change' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  },
  created () {
    setTimeout(() => {
      this.getdetail()
    }, 500)
  },
  methods: {
    getdetail () {
      let _id = this.$route.params.id
      if (_id === '1') {
        this.id = ''
      } else {
        this.id = _id
        this.$http.post('/admin/admin-detail', {_id: _id}).then((res) => {
          let data = res.data.data[0]
          this.ruleForm.name = data.name
          this.ruleForm.email = data.email
          this.ruleForm.phone = data.phone
          this.ruleForm.status = data.status
          this.ruleForm.pass = data.pass
          this.disabled = true
          console.log(res)
        })
          .catch((err) => {
            console.log(err)
          })
      }
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/admin/admin-add', {
            _id: this.id,
            name: this.ruleForm.name,
            email: this.ruleForm.email,
            phone: this.ruleForm.phone,
            status: this.ruleForm.status,
            pass: this.ruleForm.pass.length === 40 ? this.ruleForm.pass : sha1(this.ruleForm.pass)
          }).then((res) => {
            if (res.data.status === 200) {
              this.$message({
                message: '添加成功',
                type: 'success'
              })
              this.$router.push({ path: '/admin-list' })
            } else {
              this.$message({
                message: res.data.message,
                type: 'info'
              })
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
