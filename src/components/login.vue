<template>
<div>
  <img src="../assets/logo.png" alt="">
  <h3>欢迎来到我的blog</h3>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm formbox">
    <el-form-item label="用户名" prop="nickname">
      <el-input type="text" v-model="ruleForm2.nickname" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="输入密码" prop="pass">
      <el-input type="password" v-model="ruleForm2.pass" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
import sha1 from 'js-sha1'
import { mapActions } from 'vuex'
export default {
  data () {
    var validateName = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入用户名'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        callback()
      }
    }
    return {
      ruleForm2: {
        nickname: '',
        pass: ''
      },
      rules2: {
        nickname: [
          { validator: validateName, trigger: 'blur' }
        ],
        pass: [
          { validator: validatePass, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/admin/admin-login', {
            name: this.ruleForm2.nickname,
            pass: sha1(this.ruleForm2.pass)
          }).then((res) => {
            if (res.data.status === 200) {
              this.$message({
                message: '登录成功',
                type: 'success'
              })
              this.setlogin({str: res.data.data, type: true})
              this.$router.push({ path: '/' })
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
    },
    ...mapActions([
      'setlogin'
    ])
  }
}
</script>

<style>
.formbox{
  width: 50%;
  margin-right: auto;
  margin-left: auto;
}
</style>
