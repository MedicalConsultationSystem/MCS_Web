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
        <span>{{ scope.row.doctorName }}</span>
      </template>
    </el-table-column>
      <el-table-column
          label="职称"
          align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.doctorLevel }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="所属科室"
          align="center"
          >
        <template slot-scope="scope">
          <span>{{ scope.row.department }}</span>
        </template>
      </el-table-column>
      <el-table-column
          label="所属机构"
          align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.organization }}</span>
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
  <Dialog :dialog="dialog" :form-data="formData"></Dialog>
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
    search_data:{
      doctorName:'',
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
    allTableData: [
      {
        doctorName:"1JIA1",
        department: "内科",
        remark:"无",
        organization:"浙江省第一医院",
        doctorLevel:"医师",
      },
      {
        doctorName:"1JIA2",
        department: "外科",
        remark:"无",
        organization:"浙江省第一医院",
        doctorLevel:"医师",
      },
      {
        doctorName:"1JIA3",
        department: "骨科",
        remark:"无",
        organization:"浙江省第一医院",
        doctorLevel:"医师",
      },
      {
        doctorName:"1JIA4",
        department: "内科",
        remark:"无",
        organization:"浙江省第一医院",
        doctorLevel:"医师",
      },
      {
        doctorName:"1JIA5",
        department: "外科",
        remark:"无",
        organization:"浙江省第一医院",
        doctorLevel:"医师",
      },
      {
        doctorName:"1JIA6",
        department: "骨科",
        remark:"无",
        organization:"浙江省第一医院",
        doctorLevel:"医师",
      },
      {
        doctorName:"1JIA7",
        department: "内科",
        remark:"无",
        organization:"浙江省第一医院",
        doctorLevel:"医师",
      },
      {
        doctorName:"1JIA8",
        department: "外科",
        remark:"无",
        organization:"浙江省第一医院",
        doctorLevel:"医师",
      },
      {
        doctorName:"1JIA9",
        department: "骨科",
        remark:"无",
        organization:"浙江省第一医院",
        doctorLevel:"医师",
      },
      {
        doctorName:"1JIA10",
        department: "内科",
        remark:"无",
        organization:"浙江省第一医院",
        doctorLevel:"医师",
      },
      {
        doctorName:"1JIA11",
        department: "外科",
        remark:"无",
        organization:"浙江省第一医院",
        doctorLevel:"医师",
      },
      {
        doctorName:"1JIA12",
        department: "骨科",
        remark:"无",
        organization:"浙江省第一医院",
        doctorLevel:"医师",
      },
    ],
    dialog:{  //弹出框
      title:'',
      show:false,
      option:'edit'
    },

    departments:[
      {
        id:1,
        label:"内科"
      },
      {
        id:2,
        label:"外科"
      },
      {
        id:3,
        label:"骨科"
      }],

    organizations:[
      {
        org_id:1,
        org_name:"浙江省第一医院"
      },
      {
        org_id:2,
        org_name:"浙江省第二医院"
      },
      {
        org_id:3,
        org_name:"浙江医院"
      },
      {
        org_id:4,
        org_name:"杭州市第一人民医院"
      },
      {
        org_id:5,
        org_name:"杭州市中医院"
      },
      {
        org_id:6,
        org_name:"浙江省人民医院浙江省立医院"
      },
      {
        org_id:7,
        org_name:"浙江大学医学院附属第一医院"
      },
      {
        org_id:8,
        org_name:"浙江大学医学院附属第一医院"
      },
      {
        org_id:9,
        org_name:"浙江大学医学院附属第一医院"
      },
      {
        org_id:7,
        org_name:"浙江大学医学院附属第一医院"
      },
      {
        org_id:7,
        org_name:"浙江大学医学院附属第一医院"
      },
      {
        org_id:7,
        org_name:"浙江大学医学院附属第一医院"
      },
      {
        org_id:7,
        org_name:"浙江大学医学院附属第一医院"
      },
      {
        org_id:7,
        org_name:"浙江大学医学院附属第一医院"
      }
    ],

    tableData:[], //分页数据
    formData: {  //添加编辑删除需要传的字段
      doctorName: "",
      department: "",
      remark: "",
      organization:"",
      doctorLevel:"",
      depts:this.departments,
      orgs:this.organizations
    },
  }
  },
  created () {
    this.setPaginations();
  },
  methods:{
    getMsg(){
      this.$axios
          .get('https://api.zghy.xyz/dept/listAll')
          .then(res => {
            console.log(res);
            if(res.data.msg==="科室信息获取成功"){
              this.$message({
                message: '科室信息获取成功',
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
        option:'edit'
      }
      this.formData = {
        doctorName:"",
        department:"",
        remark:"",
        organization:"",
        doctorLevel: "",
        depts:this.departments,
        orgs:this.organizations
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
        doctorName:row.doctorName,
        department:row.department,
        remark:row.remark,
        doctorLevel: row.doctorLevel,
        organization:row.organization,
        id:row.id,
        depts:this.departments,
        orgs:this.organizations
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
