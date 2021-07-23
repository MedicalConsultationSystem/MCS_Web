<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.show">
    <el-form :model="formData" ref="dialogData" :rules="formDialog">
      <el-form-item label="科室名称" :label-width="formLabelWidth">
        <el-input v-model="formData.dept_name" autocomplete="off"></el-input>
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
      formLabelWidth: '120px',
      formDialog: {
        dept_name: [{ required: true, message: "科室名称不能为空", trigger: "blur" }],
      }
    }
  },
  methods:{
    dialogAdd(dialogData){
      this.$refs[dialogData].validate(valid =>{
        if(valid){
          console.log(this.formData)
          let reqJson= JSON.stringify(this.formData)
          console.log(reqJson)
          console.log(typeof (reqJson))
          if(this.dialog.option==="add") {
            this.$axios.post('https://api.zghy.xyz/dept/add',reqJson)
                .then(res =>{
                  console.log(res);
                  if(res.data.code===0){
                    this.$message({
                      message: "添加科室信息成功",
                      type: "success"
                    }
                    );
                    this.dialog.show = false;
                    // 更新数据
                    this.$emit("update"); //传递父组件,进行视图更新
                    //情况内容
                    this.formData = "";
                  }else if(res.data.code===-1){
                    this.$message({
                      message: "科室名称不能为空",
                      type: "error"
                    });
                  }
                })
          }else {
            this.$axios.put('https://api.zghy.xyz/dept/updateDept',reqJson)
                .then(res=>{
                  console.log(res);
                  if(res.data.code===0){
                    this.$message({
                      message: "更新科室信息成功",
                      type: "success"
                    });
                    this.dialog.show = false;
                    // 更新数据
                    this.$emit("update"); //传递父组件,进行视图更新
                    //情况内容
                  }else if(res.data.code===-1){
                    this.$message({
                      message: "科室名称不能为空",
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
