<template>
  <div>
    <el-container style="height: 950px">
      <el-aside style="background: #304156;width: 160px;align:center" >
        <div class="title" style="background: #304156;width: 160px">
          <img alt class="logoimg" src="@/assets/avatar.png"/>
          <p class="tit-text" :style="{color:'#fff'}">MCS</p>
        </div>
        <el-menu
            default-active="/doctor"
            class="el-menu-vertical-demo"
            @open="open"
            @close="close"
            background-color="#304156"
            style="background: #304156;width: 160px"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item index="/doctor" @click="goto('/doctor')">
            <i class="el-icon-user"></i>
            <span slot="title">医生</span>
          </el-menu-item>
          <el-menu-item index="/medicine" @click="goto('/medicine')">
            <i class="el-icon-first-aid-kit"></i>
            <span slot="title">药物</span>
          </el-menu-item>
          <el-menu-item index="/dept" @click="goto('/dept')">
            <i class="el-icon-office-building"></i>
            <span slot="title">科室</span>
          </el-menu-item>
          <el-menu-item index="/org" @click="goto('/org')">
            <i class="el-icon-school"></i>
            <span slot="title">机构</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header  class="navbar">
          <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
            <i class="el-icon-setting" style="margin-left: 1600px;position: relative"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/login">
                  登出
                  </router-link>
                </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="margin-left: 16px">王小虎</span>
        </el-header>
        <el-main style="background: #EDEDED"><router-view></router-view></el-main>
      </el-container>

    </el-container>


  </div>

</template>

<script>


export default {
  name: "Index",
  data() {
    return {};
  },
  methods: {
    goto(path) {
      this.$router.replace(path)
    },
  },
  mounted() {

  }
};
</script>
<style lang="scss">
@import "Index.scss";
.el-header {
  background-color: #fff;
  color: #333;
  line-height: 60px;
  margin-top: 0;
  padding: 0;
}
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
