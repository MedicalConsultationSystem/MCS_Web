<template>
<div class="toollist">
  <div>
    <el-form :inline="true" ref="search_data" :model="search_data">
      <div class="search">
        <el-form-item label="请选择时间">
          <el-input
              v-model="name"
              placeholder="请输入医生姓名">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size ="small" icon="el-icon-search">查询</el-button>
        </el-form-item>
      </div>
      <el-form-item class="btnRight">
        <el-button type="primary" size ="small" icon="el-icon-edit-outline" >添加</el-button>
      </el-form-item>
    </el-form>
  </div>
</div>
</template>

<script>
export default {
name: "Doctor",
  data(){
  return{
    visible: false,
    message:"数据不存在",
    search_data:{
      startDate:'',
      endDate:''
    }
  }
  }
}
</script>

<style scoped>
.toollist {
  padding: 10px;
}
.search{
  float: left;
}
.btnRight{
  float: right;
}

</style>
