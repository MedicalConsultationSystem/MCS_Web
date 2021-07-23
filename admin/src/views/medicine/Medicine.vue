<template>
  <div class="toollist">
    <div>
      <el-form :inline="true" ref="search_data" :model="search_data" >
        <div class="search">
          <el-form-item>
            <el-input
                v-model="search_data.drug_name"
                placeholder="请输入药物名称">
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
            label="药品通用名称"
            align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.drug_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="商品名"
            align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.trade_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="拼音码"
            align="center"
            width="100px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.pinyin_code }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="药品规格"
            align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.specification }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="包装单位"
            align="center"
            width="100px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.pack_unit }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="药品价格"
            align="center"
            width="100px"
            >
          <template slot-scope="scope">
            <span>{{ scope.row.price }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="剂量"
            align="center"
            width="90px"
            >
          <template slot-scope="scope">
            <span>{{ scope.row.dose }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="剂量单位"
            align="center"
            width="100px"
            >
          <template slot-scope="scope">
            <span>{{ scope.row.dose_unit }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="产地"
            align="center"
            >
          <template slot-scope="scope">
            <span>{{ scope.row.factory_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="批准文号"
            align="center"
            >
          <template slot-scope="scope">
            <span>{{ scope.row.approval_number }}</span>
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
                @click="open(scope.$index, scope.row)"
            >删除</el-button>
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

import Dialog from "@/components/dialogMedicine";
export default {
  name: "Medicine",
  components: {Dialog},
  data(){
    return{
      dialogFormVisible: false,
      message:"数据不存在",
      btn_disabled:true,
      search_data:{
        drug_name:'',
      },
      formLabelWidth: '120px',
      paginations:{
        page_index:1, //当前位于哪页
        total:0, //总数
        page_size:10, //一页显示多少条
        page_sizes:[10,15,20], //每页显示多少条
        layout:'total, sizes, prev, pager, next, jumper'
      },
      pack_units:[
        {
          id:1,
          pack_unit:"盒"
        },
        {
          id:2,
          pack_unit:"支"
        },
        {
          id:3,
          pack_unit:"瓶"
        },
      ],
      dose_units:[
        {
          id:1,
          dose_unit:"g"
        },
        {
          id:2,
          dose_unit:"mg"
        },
        {
          id:3,
          dose_unit:"ml"
        },
      ],
      allTableData: [],
      dialog:{  //弹出框
        title:'',
        show:false,
        option:'edit'
      },
      formData : {
        drug_name:"",
        trade_name: "",
        specification:"",
        pack_unit:"",
        price:"",
        dose:"",
        dose_unit:"",
        factory_name:"",
        approval_number:"",
        pinyin_code:"",
        pack_units:this.pack_units,
        dose_units:this.dose_units
      },
      tableData:[], //分页数据
    }
  },
  created () {
    this.setPaginations();
    this.getMsg();
  },
  methods:{
    findByName(){
      console.log(this.search_data)
      if(this.search_data.drug_name===""){
        this.$message({
          message: '搜索关键字不能为空',
          type: 'warning'
        });
      }
      let reqJson=JSON.stringify(this.search_data)
      this.$axios
          .post('https://api.zghy.xyz/drug/findByName',reqJson)
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
          .get('https://api.zghy.xyz/drug/listAll')
          .then(res => {
            console.log(res);
            if(res.data.msg==="药物信息获取成功"){
              this.$message({
                message: '药物信息获取成功',
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
        title:'编辑药物信息',
        show:true,
        option:'add'
      }
      this.formData = {
        drug_name:"",
        trade_name: "",
        specification:"",
        pack_unit:"",
        price:"",
        dose:"",
        dose_unit:"",
        factory_name:"",
        approval_number:"",
        pinyin_code:"",
        pack_units:this.pack_units,
        dose_units:this.dose_units
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
        title:'编辑药物信息',
        show:true,
        option:'edit'
      }
      this.formData = {
        drug_id:row.drug_id,
        drug_name:row.drug_name,
        trade_name: row.trade_name,
        specification:row.specification,
        pack_unit:row.pack_unit,
        price:row.price,
        pinyin_code:row.pinyin_code,
        dose:row.dose,
        dose_unit:row.dose_unit,
        factory_name:row.factory_name,
        approval_number:row.approval_number,
        pack_units:this.pack_units,
        dose_units:this.dose_units
      }
    },
    handleDelete(index,row){
      let reqJson={
        drug_name:row.drug_name,
        drug_id: row.drug_id,
        trade_name: row.trade_name,
        specification:row.specification,
        pack_unit:row.pack_unit,
        price:row.price,
        dose:row.dose,
        dose_unit:row.dose_unit,
        factory_name:row.factory_name,
        approval_number:row.approval_number,
        pinyin_code:row.pinyin_code,
      }
      console.log(reqJson);
      reqJson.dept_id=parseInt(reqJson.drug_id);
      reqJson.dose=parseInt(reqJson.dose);
      reqJson.price=parseInt(reqJson.price);
      console.log(typeof(reqJson.dept_id))
      reqJson=JSON.stringify(reqJson)
      this.$axios.delete('https://api.zghy.xyz/drug/deleteDrug',{data:reqJson})
          .then(res =>{
            console.log(res);
            let msg="success";
            if(res.data.code===0){
              console.log("nb")
              this.$message({
                message: "删除科室信息成功",
                type: "success"
              });
              this.getMsg();
              return msg;

            }
          })
    },
    open(index,row) {
      this.$confirm('此操作将永久删除该科室信息，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let msg=this.handleDelete(index,row)
        console.log(msg)
        if(msg==="success"){
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          console.log("lalal")

        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
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
