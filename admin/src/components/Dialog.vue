<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.show" >
    <el-form :model="formData" ref="dialogData">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="formData.doctor_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="职称" :label-width="formLabelWidth">
        <el-select v-model="formData.level_name" placeholder="请选择职称" style="width: 840px">
          <el-option v-for="item in level_names" :value="item.label" :key="item.label" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属科室" :label-width="formLabelWidth">
        <el-select v-model="formData.dept_name" placeholder="请选择科室" clearable filterable style="width: 840px">
          <el-option v-for="item in formData.depts" :value="item.dept_name" :key="item.dept_name" :label="item.dept_name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属机构" :label-width="formLabelWidth">
        <el-select v-model="formData.org_name" placeholder="请选择机构" clearable filterable style="width: 840px">
          <el-option v-for="item in formData.orgs" :value="item.org_name" :key="item.org_name" :label="item.org_name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="电话号码" :label-width="formLabelWidth">
        <el-input v-model="formData.doctor_id" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialog.show = false">取 消</el-button>
      <el-button type="primary" @click="dialogAdd('dialogData')">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
name: "Dialog",
  data(){
  return{
    formLabelWidth: '80px',
    a:{
      "yishi":1,
      "yishi222":2
    },
    level_names:[
      {
        id:1,
        label:"医士"
      },
      {
        id:2,
        label:"医师"
      },
      {
        id:3,
        label:"住院医师"
      },
      {
        id:4,
        label:"主治医师"
      },
      {
        id:5,
        label:"副主任医师"
      },
      {
        id:6,
        label:"主任医师"
      },
    ],
  }
  },
  methods:{
   dialogAdd(dialogData){
     this.$refs[dialogData].validate(valid =>{
       if (valid){
         console.log(this.formData)
         console.log(this.formData.level_name)
         console.log(this.a[this.formData.level_name])
         // this.formData.level_code=this.level_names[this.formData.level_name].id
         this.formData.level_name=this.level_names[this.formData.level_name].label
         this.formData.dept_id=this.formData.depts[this.formData.dept_name].dept_id
         this.formData.dept_name=this.formData.depts[this.formData.dept_name].dept_name
         this.formData.org_id=this.formData.orgs[this.formData.org_name].org_id
         this.formData.org_name=this.formData.orgs[this.formData.org_name].org_name
         let reqJson=JSON.stringify(this.formData)
         console.log(reqJson)
         if(this.dialog.option==="add"){
           this.$axios
           .post('https://api.zghy.xyz/doctor/add',reqJson)
           .then(res=>{
             console.log(res)
             if (res.data.code===0){
               this.$message({
                 message:"添加医生信息成功",
                 type:"success"
               });
               this.dialog.show = false;
               this.$emit("update"); //传递父组件,进行视图更新
               this.formData = "";
             }else if(res.data.code===-1){
               this.$message({
                 message: "所填信息不能为空",
                 type: "error"
               });
             }
           })
         }else{
           let reqJson
           this.$axios.put('https://api.zghy.xyz/doctor/updateDoctor',reqJson)
               .then(res=>{
                 console.log(res);
                 if(res.data.code===0){
                   this.$message({
                     message: "更新医生信息成功",
                     type: "success"
                   });
                   this.dialog.show = false;
                   // 更新数据
                   this.$emit("update"); //传递父组件,进行视图更新
                   //情况内容
                 }else if(res.data.code===-1){
                   this.$message({
                     message: "所选信息不能为空",
                     type: "error"
                   });
                 }
               })
         }
       }
     })
   }
  },

  props:{
  dialog:Object,
    formData:Object
  }
}
</script>

<style scoped>

</style>
