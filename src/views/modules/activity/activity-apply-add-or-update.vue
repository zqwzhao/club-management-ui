<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="账户编号" prop="accountId">
      <el-input v-model="dataForm.accountId" placeholder="账户编号"></el-input>
    </el-form-item>
    <el-form-item label="活动编号" prop="activityId">
      <el-input v-model="dataForm.activityId" placeholder="活动编号"></el-input>
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <el-input v-model="dataForm.status" placeholder="状态"></el-input>
    </el-form-item>
    <el-form-item label="学号" prop="studentNumber">
      <el-input v-model="dataForm.studentNumber" placeholder="学号"></el-input>
    </el-form-item>
    <el-form-item label="姓名" prop="studentName">
      <el-input v-model="dataForm.studentName" placeholder="姓名"></el-input>
    </el-form-item>
    <el-form-item label="活动名称" prop="activityName">
      <el-input v-model="dataForm.activityName" placeholder="活动名称"></el-input>
    </el-form-item>
    <el-form-item label="活动地点" prop="activityPosition">
      <el-input v-model="dataForm.activityPosition" placeholder="活动地点"></el-input>
    </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" @click="dataFormSubmit()">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        dataForm: {
          id: 0,
          accountId: '',
          activityId: '',
          status: '',
          studentNumber: '',
          studentName: '',
          activityName: '',
          activityPosition: ''
        },
        dataRule: {
          accountId: [
            { required: true, message: '账户编号不能为空', trigger: 'blur' }
          ],
          activityId: [
            { required: true, message: '活动编号不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态', trigger: 'blur' }
          ],
          studentNumber: [
            { required: true, message: '学号不能为空', trigger: 'blur' }
          ],
          studentName: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          activityName: [
            { required: true, message: '活动名称不能为空', trigger: 'blur' }
          ],
          activityPosition: [
            { required: true, message: '活动地点不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.id = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.id) {
            this.$http({
              url: this.$http.adornUrl(`/api/activityapply/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.accountId = data.activityApply.accountId
                this.dataForm.activityId = data.activityApply.activityId
                this.dataForm.status = data.activityApply.status
                this.dataForm.studentNumber = data.activityApply.studentNumber
                this.dataForm.studentName = data.activityApply.studentName
                this.dataForm.activityName = data.activityApply.activityName
                this.dataForm.activityPosition = data.activityApply.activityPosition
              }
            })
          }
        })
      },
      // 表单提交
      dataFormSubmit () {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.$http({
              url: this.$http.adornUrl(`/api/activityapply/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'accountId': this.dataForm.accountId,
                'activityId': this.dataForm.activityId,
                'status': this.dataForm.status,
                'studentNumber': this.dataForm.studentNumber,
                'studentName': this.dataForm.studentName,
                'activityName': this.dataForm.activityName,
                'activityPosition': this.dataForm.activityPosition
              })
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.$message({
                  message: '操作成功',
                  type: 'success',
                  duration: 1500,
                  onClose: () => {
                    this.visible = false
                    this.$emit('refreshDataList')
                  }
                })
              } else {
                this.$message.error(data.msg)
              }
            })
          }
        })
      }
    }
  }
</script>
