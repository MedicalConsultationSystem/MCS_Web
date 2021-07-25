<template>
    <div class="userLayout">
      <div class="login_panel">
        <div class="login_panel_form">
          <div class="login_panel_form_title">
            <img class="login_panel_form_title_logo" src="@/assets/avatar.png" alt=""><p class="login_panel_form_title_p">MCS_ADMIN</p>
          </div>
          <el-form
              ref="loginForm"
              :model="loginForm"
              :rules="rules"
              @keyup.enter.native="submitForm"
          >
            <el-form-item prop="username">
              <el-input v-model="loginForm.open_id" placeholder="请输入用户名">
                <i slot="suffix" class="el-input__icon el-icon-user" />
              </el-input>
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                  v-model="loginForm.phone"
                  placeholder="请输入密码"
              >
              </el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                  type="primary"
                  style="width: 46%;margin-left:8%"
                  @click="login()"
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
    return {
      loginForm: {
        open_id: 'admin',
        phone: 'admin',
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
    },
    login(){
      let reqJson=JSON.stringify(this.loginForm)
      console.log(reqJson)
      this.$axios
          .post('https://api.zghy.xyz/account/admin',reqJson)
          .then(res=>{
            console.log(res)
            if(res.data.code===0){
              console.log(res.data.data)
              sessionStorage.setItem('token',res.data.data)
              this.submitForm()
            }
          })
      .catch(errors=>{
        console.log(errors)
      })
    }

  },
}
</script>

<style lang="scss" scoped>
@import "newLogin.scss";
</style>
