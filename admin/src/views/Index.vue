<template>
  <div>
    <el-container style="height: 950px">
      <el-aside style="background: #304156;width: 160px">
        <div class="title" style="background: #304156;width: 160px">
<!--          <img alt class="logoimg" :src="$GIN_VUE_ADMIN.appLogo">-->
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
        <el-header style="text-align: right; font-size: 13px ;position: relative ;">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>
                  <router-link to="/login">
                  登出
                  </router-link>
                </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span style="margin-right: 12px">王小虎</span>
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
</style>
