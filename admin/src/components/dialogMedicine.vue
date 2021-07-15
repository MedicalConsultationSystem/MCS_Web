<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.show" >
    <el-form :model="formData" ref="dialogData" :rules="formDialog">
      <el-form-item label="药品通用名称" :label-width="formLabelWidth" >
        <el-input v-model="formData.drug_name" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="商品名" :label-width="formLabelWidth">
          <el-input v-model="formData.trade_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="拼音码" :label-width="formLabelWidth" >
        <el-input v-model="formData.pinyin_code" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="药品规格" :label-width="formLabelWidth">
        <el-input v-model="formData.specification" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="包装单位" :label-width="formLabelWidth">
        <el-row :gutter="20">
          <el-col :span="6"><el-radio v-model="formData.pack_unit" label="盒">盒</el-radio></el-col>
          <el-col :span="6"><el-radio v-model="formData.pack_unit" label="支">支</el-radio></el-col>
          <el-col :span="6"><el-radio v-model="formData.pack_unit" label="瓶">瓶</el-radio></el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="药品价格" :label-width="formLabelWidth">
        <el-input v-model="formData.price" type="number" min="0" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="剂量" :label-width="formLabelWidth">
        <el-input v-model="formData.dose" type="number" min="0" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="剂量单位" :label-width="formLabelWidth">
        <el-col :span="6"><el-radio v-model="formData.dose_unit" label="1">g</el-radio></el-col>
        <el-col :span="6"><el-radio v-model="formData.dose_unit" label="2">mg</el-radio></el-col>
        <el-col :span="6"><el-radio v-model="formData.dose_unit" label="3">ml</el-radio></el-col>
      </el-form-item>
      <el-form-item label="产地" :label-width="formLabelWidth">
        <el-input v-model="formData.factory_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="批准文号" :label-width="formLabelWidth">
        <el-input v-model="formData.approval_number" autocomplete="off"></el-input>
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
      formLabelWidth: '100px',
      formDialog: {
        drug_name: [{ required: true, message: "药品通用名称", trigger: "blur" }],
        trade_name: [{ required: true, message: "商品名", trigger: "blur" }],
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
          this.$axios.post('https://api.zghy.xyz/drug/add',reqJson,{headers:{'Content-Type':'application/raw'}})
              .then(res =>{
                console.log(res);
                this.$message({
                  message: "添加药物信息成功",
                  type: "success"
                });
              })
          this.dialog.show = false;
          // 更新数据
          this.$emit("update"); //传递父组件,进行视图更新
          //情况内容
          this.formData = "";
        }
      })
    },
  },
  props:{
    dialog:Object,
    formData:Object
  }
}
</script>

<style scoped>
.el-form-item{
  style:"width: 40%"
}
</style>
