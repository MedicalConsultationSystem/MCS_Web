<template>
  <div>
    <el-container style="height: 950px">
      <el-aside :style="{background: '#191a23'}">
        <div class="title" :style="{background:'#191a23'}">
<!--          <img alt class="logoimg" :src="$GIN_VUE_ADMIN.appLogo">-->
          <p class="tit-text" :style="{color:'#fff'}">MVC</p>
        </div>
        <el-menu
            default-active="/doctor"
            class="el-menu-vertical-demo"
            @open="open"
            @close="close"
            background-color="#545c64"
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













<!--<template>-->
<!--  <div style="height: 100%;width:100%">-->
<!--    <el-container style="margin-top: 0; height: 600px; border: 1px solid #eee">-->
<!--      <el-aside width="200px" style="background-color: rgb(238, 241, 246)">-->
<!--        <el-menu :default-openeds="['1', '3']">-->
<!--          <el-submenu index="1">-->
<!--            <template slot="title"><i class="el-icon-message"></i>医生</template>-->
<!--          </el-submenu>-->
<!--          <el-submenu index="2">-->
<!--            <template slot="title"><i class="el-icon-menu"></i>导航二</template>-->
<!--          </el-submenu>-->
<!--        </el-menu>-->
<!--      </el-aside>-->

<!--      <el-container>-->
<!--        <el-header style="text-align: right; font-size: 12px">-->
<!--          <el-dropdown>-->
<!--            <i class="el-icon-setting" style="margin-right: 15px"></i>-->
<!--            <el-dropdown-menu slot="dropdown">-->
<!--              <el-dropdown-item>查看</el-dropdown-item>-->
<!--            </el-dropdown-menu>-->
<!--          </el-dropdown>-->
<!--          <span>王小虎</span>-->
<!--        </el-header>-->

<!--      </el-container>-->
<!--    </el-container>-->
<!--  </div>-->
<!--</template>-->

<!--<style>-->
<!--.el-header {-->
<!--  background-color: #B3C0D1;-->
<!--  color: #333;-->
<!--  line-height: 60px;-->
<!--}-->

<!--.el-aside {-->
<!--  color: #333;-->
<!--}-->
<!--</style>-->

<!--<script>-->
<!--export default {-->
<!--  data() {-->
<!--    const item = {-->
<!--      date: '2016-05-02',-->
<!--      name: '王小虎',-->
<!--      address: '上海市普陀区金沙江路 1518 弄'-->
<!--    };-->
<!--    return {-->
<!--      tableData: Array(20).fill(item)-->
<!--    }-->
<!--  }-->
<!--};-->
<!--</script>-->
