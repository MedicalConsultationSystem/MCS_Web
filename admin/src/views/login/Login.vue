<template>
  <div id="userLayout">
    <div class="login_panel">
      <div class="login_panel_form">
        <el-form
            ref="loginForm"
            :model="loginForm"
            :rules="rules"
            @keyup.enter.native="submitForm"
        >
          <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="请输入用户名">
              <i slot="suffix" class="el-input__icon el-icon-user" />
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
                v-model="loginForm.password"
                placeholder="请输入密码"
            >
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button
                type="primary"
                style="width: 46%;margin-left:8%"
                @click="submitForm"
            >登 录</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div class="login_panel_right"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data(){
    const checkUsername = (rule, value, callback) => {
      if (value.length < 5) {
        return callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const checkPassword = (rule, value, callback) => {
      if (value.length < 6) {
        return callback(new Error('请输入正确的密码'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: '123456',
      },
      rules: {
        username: [{ validator: checkUsername, trigger: 'blur' }],
        password: [{ validator: checkPassword, trigger: 'blur' }]
      },
    }

  },
  methods:{
    submitForm(){
      this.$refs.loginForm.validate((v)=>{
        if(v){
          this.$router.push('/index');
        }else {
          this.$message({
            type: 'error',
            message: '请正确填写登录信息',
            showClose: true
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "newLogin.scss";
</style>
