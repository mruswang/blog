<template>
  <div class="content" ref="content" :style="{'paddingLeft':isCollapse?'64px':'200px'}">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="200px" class="demo-ruleForm">
      <el-form-item label="手机号" prop="phone">
        <el-input type="number" v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="原密码" prop="oldpass">
        <el-input type="password" v-model="ruleForm.oldpass"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newpass">
        <el-input type="password" v-model="ruleForm.newpass"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import sha1 from 'js-sha1'
export default {
  data () {
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
        phone: '',
        oldpass: '',
        newpass: ''
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ],
        oldpass: [
          { required: true, message: '请输入旧密码', trigger: 'blur' }
        ],
        newpass: [
          { required: true, message: '请输入新密码', trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'isCollapse'
    ])
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$http.post('/admin/admin-pass', {
            phone: this.ruleForm.phone,
            oldpass: sha1(this.ruleForm.oldpass),
            newpass: sha1(this.ruleForm.newpass)
          }).then((res) => {
            if (res.data.status === 200) {
              this.$message({
                message: '修改成功',
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
