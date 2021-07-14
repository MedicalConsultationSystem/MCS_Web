<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.show" >
    <el-form :model="formData">
      <el-form-item label="机构名称" :label-width="formLabelWidth" >
        <el-input v-model="formData.orgName" autocomplete="off"></el-input>
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
