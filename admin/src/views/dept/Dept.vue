<template>
  <div class="toollist">
    <div>
      <el-form :inline="true" ref="search_data" :model="search_data">
        <div class="search">
          <el-form-item>
            <el-input
                v-model="searchData"
                placeholder="请输入科室名称">
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
            label="序号"
            align="center"
            width="80px"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.dept_id }}</span>
          </template>
        </el-table-column>
        <el-table-column
            label="科室名称"
            align="justify"
            style="text-align: justify;margin: 30px"
        >
          <template slot-scope="scope" style="text-align: justify;margin: 30px ">
            <span style="text-align: justify;margin: 30px ">{{ scope.row.dept_name }}</span>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            label="操作"
        width="160px">
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
import Dialog from "@/components/dialogDept";
export default {
  name: "Dept",
  components: {Dialog},
  data() {
    return {
      search_data:{
        doctorName:'',
      },
      info:"",
      dept_id:null,
      dept_name:"",
      message:"数据不存在",
      formLabelWidth: '120px',
      paginations:{
        page_index:1, //当前位于哪页
        total:0, //总数
        page_size:10, //一页显示多少条
        page_sizes:[10,15,20], //每页显示多少条
        layout:'total, sizes, prev, pager, next, jumper'
      },
      allTableData:[
        {
          "dept_id":1,
          "dept_name":"lala"
        }
      ],
      dialog:{  //弹出框
        title:'',
        show:false,
        option:'edit'
      },
      tableData:[], //分页数据
      formData : {
        deptName:""
      }
    }
  },
  created () {
    this.setPaginations();
    this.$axios
        .get('https://api.zghy.xyz/dept/listAll')
        .then((res)=>{
          console.log(res);
          if(res.data.msg==="科室信息获取成功"){
            this.$message({
              message: '科室信息获取成功',
              type: 'success'
            });
            console.log(JSON.stringify(res.data.data))
            console.log(this.allTableData)
            this.allTableData=res.data.data
            console.log(this.allTableData)
          }
        })
        .catch((error)=>{
          console.log(error)
        })
    console.log(this.info)
  },
  mounted() {

  },
  methods:{
    handleCurrentChange(page){
      //获取当前页
      let index = this.paginations.page_size * (page -1);

      //数据的总数
      let nums = this.paginations.page_size * page;
      //容器
      let tables = [];
      console.log("1");
      console.log(this.allTableData);
      for(let i = index; i < nums; i++) {
        if(this.allTableData[i]) {
          tables.push(this.allTableData[i])
        }
        this.tableData = tables;
      }
    },
    onAddDoctor(){//添加信息
      this.dialog={
        title:'编辑科室信息',
        show:true,
        option:'edit'
      }
      this.formData = {
        deptName:""
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
        title:'编辑科室信息',
        show:true,
        option:'edit'
      }
      console.log("lalal")
      this.formData = {
        deptName:row.deptName
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
