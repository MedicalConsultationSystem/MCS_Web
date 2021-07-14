<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.show">
    <el-form :model="formData">
      <el-form-item label="药品通用名称" :label-width="formLabelWidth">
        <el-input v-model="formData.drug_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="商品名" :label-width="formLabelWidth">
          <el-input v-model="formData.trade_name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="药品规格" :label-width="formLabelWidth">
        <el-input v-model="formData.specification" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="包装单位" :label-width="formLabelWidth">
        <el-select v-model="formData.pack_unit" placeholder="请选择包装单位" clearable filterable>
          <el-option v-for="item in formData.pack_units" :value="item.id" :key="item.id" :label="item.pack_unit"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="药品价格" :label-width="formLabelWidth">
        <el-input v-model="formData.price" type="number" min="0" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="剂量" :label-width="formLabelWidth">
        <el-input v-model="formData.dose" type="number" min="0" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="剂量单位" :label-width="formLabelWidth">
        <el-input v-model="formData.dose_unit" autocomplete="off"></el-input>
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
      formLabelWidth: '120px',
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
