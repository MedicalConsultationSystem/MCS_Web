<template>
  <div class="toollist">
    <div>
      <el-form :inline="true" ref="search_data" :model="search_data" >
        <div class="search">
          <el-form-item>
            <el-input
                v-model="name"
                placeholder="请输入药物名称">
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
        >
          <template slot-scope="scope">
            <span>{{ scope.row.pack_unit }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="药品价格"
            align="center"
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

import Dialog from "@/components/dialogMedicine";
export default {
  name: "Doctor",
  components: {Dialog},
  data(){
    return{
      dialogFormVisible: false,
      message:"数据不存在",
      search_data:{
        doctorName:'',
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
      allTableData: [
        {
          drug_name:"肠炎宁片",
          trade_name: "[康恩贝]肠炎宁片",
          specification:"0.42g*48片",
          pack_unit:"盒",
          price:"30.00",
          dose:"0.42",
          dose_unit:"g",
          factory_name:"江西康恩贝中药有限公司",
          approval_number:"国药准字Z36020518",
        },
        {
          drug_name:"肠炎宁片",
          trade_name: "[康恩贝]肠炎宁片",
          specification:"0.42g*48片",
          pack_unit:"盒",
          price:"30.00",
          dose:"0.42",
          dose_unit:"g",
          factory_name:"江西康恩贝中药有限公司",
          approval_number:"国药准字Z36020518",
        },
        {
          drug_name:"肠炎宁片",
          trade_name: "[康恩贝]肠炎宁片",
          specification:"0.42g*48片",
          pack_unit:"盒",
          price:"30.00",
          dose:"0.42",
          dose_unit:"g",
          factory_name:"江西康恩贝中药有限公司",
          approval_number:"国药准字Z36020518",
        },
        {
          drug_name:"肠炎宁片",
          trade_name: "[康恩贝]肠炎宁片",
          specification:"0.42g*48片",
          pack_unit:"盒",
          price:"30.00",
          dose:"0.42",
          dose_unit:"g",
          factory_name:"江西康恩贝中药有限公司",
          approval_number:"国药准字Z36020518",
        },
        {
          drug_name:"肠炎宁片",
          trade_name: "[康恩贝]肠炎宁片",
          specification:"0.42g*48片",
          pack_unit:"盒",
          price:"30.00",
          dose:"0.42",
          dose_unit:"g",
          factory_name:"江西康恩贝中药有限公司",
          approval_number:"国药准字Z36020518",
        },
        {
          drug_name:"肠炎宁片",
          trade_name: "[康恩贝]肠炎宁片",
          specification:"0.42g*48片",
          pack_unit:"盒",
          price:"30.00",
          dose:"0.42",
          dose_unit:"g",
          factory_name:"江西康恩贝中药有限公司",
          approval_number:"国药准字Z36020518",
        },
        {
          drug_name:"肠炎宁片",
          trade_name: "[康恩贝]肠炎宁片",
          specification:"0.42g*48片",
          pack_unit:"盒",
          price:"30.00",
          dose:"0.42",
          dose_unit:"g",
          factory_name:"江西康恩贝中药有限公司",
          approval_number:"国药准字Z36020518",
        },
        {
          drug_name:"肠炎宁片",
          trade_name: "[康恩贝]肠炎宁片",
          specification:"0.42g*48片",
          pack_unit:"盒",
          price:"30.00",
          dose:"0.42",
          dose_unit:"g",
          factory_name:"江西康恩贝中药有限公司",
          approval_number:"国药准字Z36020518",
        },
        {
          drug_name:"肠炎宁片",
          trade_name: "[康恩贝]肠炎宁片",
          specification:"0.42g*48片",
          pack_unit:"盒",
          price:"30.00",
          dose:"0.42",
          dose_unit:"g",
          factory_name:"江西康恩贝中药有限公司",
          approval_number:"国药准字Z36020518",
        },
        {
          drug_name:"肠炎宁片",
          trade_name: "[康恩贝]肠炎宁片",
          specification:"0.42g*48片",
          pack_unit:"盒",
          price:"30.00",
          dose:"0.42",
          dose_unit:"g",
          factory_name:"江西康恩贝中药有限公司",
          approval_number:"国药准字Z36020518",
        },
        {
          drug_name:"肠炎宁片",
          trade_name: "[康恩贝]肠炎宁片",
          specification:"0.42g*48片",
          pack_unit:"盒",
          price:"30.00",
          dose:"0.42",
          dose_unit:"g",
          factory_name:"江西康恩贝中药有限公司",
          approval_number:"国药准字Z36020518",
        },
        {
          drug_name:"肠炎宁片",
          trade_name: "[康恩贝]肠炎宁片",
          specification:"0.42g*48片",
          pack_unit:"盒",
          price:"30.00",
          dose:"0.42",
          dose_unit:"g",
          factory_name:"江西康恩贝中药有限公司",
          approval_number:"国药准字Z36020518",
        },
      ],
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
        pack_units:this.pack_units,
        dose_units:this.dose_units
      },
      tableData:[], //分页数据
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
      this.dialog={
        title:'编辑药物信息',
        show:true,
        option:'edit'
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
        drug_name:row.drug_name,
        trade_name: row.trade_name,
        specification:row.specification,
        pack_unit:row.pack_unit,
        price:row.price,
        dose:row.dose,
        dose_unit:row.dose_unit,
        factory_name:row.factory_name,
        approval_number:row.approval_number,
        pack_units:this.pack_units,
        dose_units:this.dose_units
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
