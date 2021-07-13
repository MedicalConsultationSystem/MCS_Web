<template>
  <div>
    <el-container>
      <el-aside>
        <el-menu
            default-active="/doctor"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
          <el-menu-item index="/doctor" @click="goto('/doctor')">
            <i class="el-icon-menu"></i>
            <span slot="title">医生</span>
          </el-menu-item>
          <el-menu-item index="/medicine" @click="goto('/medicine')">
            <i class="el-icon-menu"></i>
            <span slot="title">药物</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>header</el-header>
        <el-main><router-view></router-view></el-main>
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
    }
  },
  mounted() {
    this.goto("./doctor")
  }
};
</script>
<style lang="scss">
//@import "Index.scss";
//
//.dark{
//  background-color: #191a23 !important;
//  color: #fff !important;
//}
//.light{
//  background-color: #fff !important;
//  color: #000 !important;
//}
</style>
