<template>
<div class="toollist">
  <div>
    <el-form :inline="true" ref="search_data" :model="search_data">
      <div class="search">
        <el-form-item>
          <el-input
              v-model="search_data.doctor_name"
              placeholder="请输入医生姓名">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size ="small" icon="el-icon-search" @click="findByName">查询</el-button>
          <el-button type="primary" size ="small" :disabled="this.btn_disabled" @click="handleCancel">取消</el-button>
        </el-form-item>
      </div>
      <el-form-item class="btnRight">
        <el-button type="primary" size ="small" icon="el-icon-edit-outline" @click="onAddDoctor()" >添加</el-button>
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
        <span>{{ scope.row.doctor_name }}</span>
      </template>
    </el-table-column>
      <el-table-column
          label="职称"
          align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.level_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="所属科室"
          align="center"
          >
        <template slot-scope="scope">
          <span>{{ scope.row.dept_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="所属机构"
          align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.org_name }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="手机号码"
          align="center"
          width="200">
        <template slot-scope="scope">
          <span>{{ scope.row.doctor_id }}</span>
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
              >删除</el-button>
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
    <div v-else class="txt">{{message}}</div>
    <div class="paginations">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page.sync="paginations.page_index"
          :page-sizes="paginations.page_sizes"
          :page-size="paginations.page_size"
          :layout="paginations.layout"
          :total="paginations.total">
      </el-pagination>
    </div>
  </div>
  <Dialog :dialog="dialog" :form-data="formData" @update="getMsg"></Dialog>
</div>
</template>

<script>
// @ is an alias to /src

import Dialog from "@/components/Dialog";
export default {
name: "Doctor",
  components: {Dialog},
  data(){
  return{
    message:"数据不存在",
    btn_disabled:true,
    search_data:{
      doctor_name:'',
    },
    form: {
      name: '',
      region: '',
      date1: '',
      date2: '',
      delivery: false,
      type: [],
      resource: '',
      desc: ''
    },
    formLabelWidth: '120px',
    paginations:{
      page_index:1, //当前位于哪页
      total:0, //总数
      page_size:10, //一页显示多少条
      page_sizes:[10,15,20], //每页显示多少条
      layout:'total, sizes, prev, pager, next, jumper'
    },
    allTableData: [],
    dialog:{  //弹出框
      title:'',
      show:false,
      option:'edit'
    },

    dept_names:[],

    org_names:[],

    tableData:[], //分页数据
    formData: {  //添加编辑删除需要传的字段
      doctor_name: "",
      dept_name: "",
      doctor_id: "",
      dept_id:"",
      org_id:"",
      org_name:"",
      level_name:"",
      depts:this.dept_names,
      orgs:this.org_names
    },
  }
  },
  created () {
    this.setPaginations();
    this.getMsg();
    this.getDept();
    this.getOrg();
  },
  methods:{

    findByName(){
      console.log(this.search_data)
      if(this.search_data.doctor_name===""){
        this.$message({
          message: '搜索关键字不能为空',
          type: 'warning'
        });
      }
      let reqJson=JSON.stringify(this.search_data)
      this.$axios
      .post('https://api.zghy.xyz/doctor/findByName',reqJson)
      .then(res=>{
        console.log(res)
        if(res.data.code===0){
          this.$message({
            message: '查询成功',
            type: 'success'
          });
          this.allTableData=res.data.data
          console.log(this.allTableData);
          this.setPaginations();
          this.btn_disabled=false
        }
      })
    },
    handleCancel(){
      this.getMsg();
      this.btn_disabled=true
    },
    getMsg(){
      this.$axios
          .get('https://api.zghy.xyz/doctor/listAll')
          .then(res => {
            console.log(res);
            if(res.data.msg==="医生信息获取成功"){
              this.$message({
                message: '医生信息获取成功',
                type: 'success'
              });
              console.log(JSON.stringify(res.data.data))
              console.log(this.allTableData)
              this.allTableData=res.data.data
              console.log(this.allTableData);
              this.setPaginations();
            }
          })
          .catch((error)=>{
            console.log(error)
          })
    },
    getOrg(){
      this.$axios
      .get('https://api.zghy.xyz/organization/listAll')
      .then(res=>{
        console.log(res)
        if(res.data.code===0){
          this.org_names=res.data.data
          console.log(this.org_names)
        }
      })
    },
    getDept(){
      this.$axios
          .get('https://api.zghy.xyz/dept/listAll')
          .then(res=>{
            console.log(res)
            if(res.data.code===0){
              this.dept_names=res.data.data
              console.log(this.dept_names)
            }
          })
    },
    handleCurrentChange(page){
      //获取当前页
      let index = this.paginations.page_size * (page -1);

      //数据的总数
      let nums = this.paginations.page_size * page;
      //容器
      let tables = [];
      for(let i = index; i < nums; i++) {
        if(this.allTableData[i]) {
          tables.push(this.allTableData[i])
        }
        this.tableData = tables;
      }
    },
    onAddDoctor(){//添加信息
      this.dialog={
        title:'编辑医生信息',
        show:true,
        option:'add'
      }
      this.formData = {
        doctor_name:"",
        dept_name:"",
        doctor_id:"",
        org_name:"",
        level_name: "",
        org_id:"",
        depts:this.dept_names,
        orgs:this.org_names
      }
    },
    handleSizeChange(page_size){
      this.paginations.page_index = 1;
      this.paginations.page_size = page_size;
      this.tableData = this.allTableData.filter((item,index) => {
        return index < page_size;
      })
    },
    setPaginations(){
      //分页属性设置
      this.paginations.total = this.allTableData.length; //数据的数量
      this.paginations.page_index = 1; //默认显示第一页
      this.paginations.page_size = 10; //每页显示的数据
      //数据显示
      this.tableData = this.allTableData.filter((item,index) => {
        return index < this.paginations.page_size;
      })

    },
    handleEdit(index,row) { //编辑信息
      this.dialog={
        title:'编辑医生信息',
        show:true,
        option:'edit'
      }
      this.formData = {
        doctor_name:row.doctor_name,
        dept_name:row.dept_name,
        org_id:row.org_id,
        doctor_id:row.doctor_id,
        level_name: row.level_name,
        org_name:row.org_name,
        id:row.id,
        depts:this.dept_names,
        orgs:this.org_names
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
.paginations{
  text-align: right;
  margin-top: 10px;
}
.txt {
  padding: 20px 0;
  background: #eee;
  font-size: 16px;
  text-align: center;
  color: #606266;
}

</style>
