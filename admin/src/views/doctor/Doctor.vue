<template>
<div class="toollist">
  <div>
    <el-form :inline="true" ref="search_data" :model="search_data">
      <div class="search">
        <el-form-item>
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
  <div class="table_container">
    <el-table
        v-if="tableData.length > 0"
        :data="tableData"
        min-height="460px"
        border
        :default-sort = "{prop: 'date', order: 'descending'}"
        style="width: 100%">
    <el-table-column
        label="姓名"
        align="center"
        >
      <template slot-scope="scope">
        <span>{{ scope.row.doctorName }}</span>
      </template>
    </el-table-column>
      <el-table-column
          label="科室"
          align="center"
          >
        <template slot-scope="scope">
          <span>{{ scope.row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="备注"
          align="center"
          width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.remark }}</span>
        </template>
      </el-table-column>
      <el-table-column
          align="center"
          label="操作">
        <template slot-scope="scope">
          <el-button
              type="primary"
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <!-- <el-popover
            placement="top"
            width="160"
            v-model="visible">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="visible = false">取消</el-button>
              <el-button type="primary" size="mini" @click="getDeleteVisible(scope.$index, scope.row)">确定</el-button>
            </div>
            <el-button slot="reference" @click="handleDelete(scope.row)">删除</el-button>
          </el-popover> -->
        </template>
      </el-table-column>
    </el-table>
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
      doctorName:'',
    },
    paginations:{
      page_index:1, //当前位于哪页
      total:0, //总数
      page_size:5, //一页显示多少条
      page_sizes:[5,10,15,20], //每页显示多少条
      layout:'total, sizes, prev, pager, next, jumper'
    },
    tableData: [
      {
        doctorName:"1JIA1",
        department: "内科",
        remark:"无",
      },
      {
        doctorName:"1JIA2",
        department: "外科",
        remark:"无",
      },
      {
        doctorName:"1JIA1",
        department: "骨科",
        remark:"无",
      },
    ],
    allTableData:[], //分页数据
    formDate: {  //添加编辑删除需要传的字段
      doctorName: "",
      department: "",
      remark: ""
    },
  }
  },
  created () {
    this.getProfiles()
  },
  methods:{
    handleEdit(index,row) { //编辑信息
      this.dialog={
        title:'编辑信息',
        show:true,
        option:'edit'
      }
      this.formDate = {
        doctorName:row.doctorName,
        department:row.department,
        remark:row.remark,
        id:row.id
      }
    },
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
