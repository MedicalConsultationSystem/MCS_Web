<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.show" >
    <el-form :model="formData" ref="dialogData">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="formData.doctor_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="职称" :label-width="formLabelWidth">
        <el-select v-model="formData.level_name" placeholder="请选择职称" style="width: 840px">
          <el-option v-for="item in level_names" :value="item.level_name" :key="item.level_name" :label="item.level_name"></el-option>
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
        <el-input v-model="formData.doctor_id" autocomplete="off" :disabled="dialog.input_disabled"></el-input>
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
    headers:{
      "x-token":sessionStorage.getItem('token'),
    },
    input_disabled:false,
    level_names:[
      {
        level_code: 1,
        level_name:"医士"
      },
      {
        level_code: 2,
        level_name: "医师"
      },
      {
        level_code: 3,
        level_name: "住院医师"
      },
      {
        level_code: 4,
        level_name: "主治医师"
      },
      {
        level_code: 5,
        level_name: "副主任医师"
      },
      {
        level_code: 6,
        level_name: "主任医师"
      },
    ],
    levels:{
      "医士":1,
      "医师":2,
      "住院医师":3,
      "主治医师":4,
      "副主任医师":5,
      "主任医师":6
    },
  }
  },
  methods:{
   dialogAdd(dialogData){
     this.$refs[dialogData].validate(valid =>{
       if (valid){
         console.log(this.formData)
         console.log(this.formData.level_name)
         console.log(this.formData.depts)
         console.log(this.levels["医士"])
         let depts_map=this.formData.depts.map(function(obj){
           let rObj={};
           rObj[obj.dept_name]=obj.dept_id
           return rObj
         })
         let orgs_map=this.formData.orgs.map(obj=>{
           let rObj={};
           rObj[obj.org_name]=obj.org_id
           return rObj
         })
         console.log(orgs_map)
         let levels_map=this.level_names.map(obj=>{
           let rObj={};
           rObj[obj.level_name]=obj.level_code
           return rObj
         })
         for(let item in depts_map){
           console.log(depts_map[item][this.formData.dept_name])
           if(depts_map[item][this.formData.dept_name]){
             this.formData.dept_id=depts_map[item][this.formData.dept_name]
             console.log(this.formData.dept_id)
           }
         }
         for(let item in orgs_map){
           console.log(orgs_map[item][this.formData.org_name])
           if(orgs_map[item][this.formData.org_name]){
             this.formData.org_id=orgs_map[item][this.formData.org_name]
             console.log(this.formData.org_id)
           }
         }
         for(let item in levels_map){
           console.log(levels_map[item][this.formData.level_name])
           if(levels_map[item][this.formData.level_name]){
             this.formData.level_code=levels_map[item][this.formData.level_name]
             console.log(this.formData.level_code)
           }
         }
         let reqJson=JSON.stringify(this.formData)
         console.log(reqJson)
         if(this.dialog.option==="add"){
           this.$axios
           .post('https://api.zghy.xyz/doctor/add',reqJson,{headers:this.headers})
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
           this.$axios.put('https://api.zghy.xyz/doctor/updateDoctor',reqJson,{headers:this.headers})
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
