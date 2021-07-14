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
  <el-dialog title="新增医生信息" :visible.sync="dialogFormVisible">
    <el-form :model="form">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="科室" :label-width="formLabelWidth">
        <el-select v-model="form.region" placeholder="请选择科室">
          <el-option label="内科" value="Internal"></el-option>
          <el-option label="外科" value="Surgery"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="form.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
    </div>
  </el-dialog>
</div>
</template>

<script>
// @ is an alias to /src

export default {
name: "Doctor",
  data(){
  return{
    dialogFormVisible: false,
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
      },
      {
        doctorName:"1JIA2",
        department: "外科",
        remark:"无",
      },
      {
        doctorName:"1JIA3",
        department: "骨科",
        remark:"无",
      },
      {
        doctorName:"1JIA4",
        department: "内科",
        remark:"无",
      },
      {
        doctorName:"1JIA5",
        department: "外科",
        remark:"无",
      },
      {
        doctorName:"1JIA6",
        department: "骨科",
        remark:"无",
      },
      {
        doctorName:"1JIA7",
        department: "内科",
        remark:"无",
      },
      {
        doctorName:"1JIA8",
        department: "外科",
        remark:"无",
      },
      {
        doctorName:"1JIA9",
        department: "骨科",
        remark:"无",
      },
      {
        doctorName:"1JIA10",
        department: "内科",
        remark:"无",
      },
      {
        doctorName:"1JIA11",
        department: "外科",
        remark:"无",
      },
      {
        doctorName:"1JIA12",
        department: "骨科",
        remark:"无",
      },
    ],
    dialog:{  //弹出框
      title:'',
      show:false,
      option:'edit'
    },
    tableData:[], //分页数据
    formData: {  //添加编辑删除需要传的字段
      doctorName: "",
      department: "",
      remark: ""
    },
  }
  },
  created () {
    this.setPaginations();
  },
  methods:{
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
      console.log("lalal");
      this.dialogFormVisible=true
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
