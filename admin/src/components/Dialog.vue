<template>
  <el-dialog :title="dialog.title" :visible.sync="dialog.show" >
    <el-form :model="formData">
      <el-form-item label="姓名" :label-width="formLabelWidth">
        <el-input v-model="formData.doctorName" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="职称" :label-width="formLabelWidth">
        <el-select v-model="formData.doctorLevel" placeholder="请选择职称" style="width: 840px">
          <el-option v-for="item in doctorLevels" :value="item.id" :key="item.id" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属科室" :label-width="formLabelWidth">
        <el-select v-model="formData.department" placeholder="请选择科室" clearable filterable style="width: 840px">
          <el-option v-for="item in formData.depts" :value="item.id" :key="item.id" :label="item.label"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属机构" :label-width="formLabelWidth">
        <el-select v-model="formData.organization" placeholder="请选择机构" clearable filterable style="width: 840px">
          <el-option v-for="item in formData.orgs" :value="item.org_id" :key="item.org_id" :label="item.org_name"></el-option>
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
    formLabelWidth: '80px',
    doctorLevels:[
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

  props:{
  dialog:Object,
    formData:Object
  }
}
</script>

<style scoped>

</style>
