<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.show" >
    <el-form :model="formData">
      <el-form-item label="药品通用名称" :label-width="formLabelWidth" >
        <el-input v-model="formData.drug_name" autocomplete="off" ></el-input>
      </el-form-item>
      <el-form-item label="商品名" :label-width="formLabelWidth">
          <el-input v-model="formData.trade_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="药品规格" :label-width="formLabelWidth">
        <el-input v-model="formData.specification" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="包装单位" :label-width="formLabelWidth">
        <el-row :gutter="20">
          <el-col :span="6"><el-radio v-model="formData.pack_unit" label="1">盒</el-radio></el-col>
          <el-col :span="6"><el-radio v-model="formData.pack_unit" label="2">支</el-radio></el-col>
          <el-col :span="6"><el-radio v-model="formData.pack_unit" label="3">瓶</el-radio></el-col>
<!--          <el-radio v-model="formData.pack_unit" label="1">盒</el-radio>-->
<!--          <el-radio v-model="formData.pack_unit" label="2">支</el-radio>-->
<!--          <el-radio v-model="formData.pack_unit" label="3">瓶</el-radio>-->
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
      <el-button type="primary" @click="dialog.show = false">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "Dialog",
  data(){
    return{
      formLabelWidth: '100px',
    }
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
