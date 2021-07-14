<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.show">
    <el-form :model="formData">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="formData.doctorName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="科室" :label-width="formLabelWidth">
        <el-select v-model="formData.department" placeholder="请选择科室">
          <el-option v-for="item in formData.depts" :value="item.id" :key="item.id">{{item.label}}</el-option>
<!--          <el-option label="内科" value="Internal"></el-option>-->
<!--          <el-option label="外科" value="Surgery"></el-option>-->
        </el-select>
      </el-form-item>
      <el-form-item label="备注" :label-width="formLabelWidth">
        <el-input v-model="formData.remark" autocomplete="off"></el-input>
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
