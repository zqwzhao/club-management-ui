<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="账户编号" prop="accountId">
      <el-input v-model="dataForm.accountId" placeholder="账户编号"></el-input>
    </el-form-item>
    <el-form-item label="社团编号" prop="clubId">
      <el-input v-model="dataForm.clubId" placeholder="社团编号"></el-input>
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
    <el-form-item label="社团名称" prop="clubName">
      <el-input v-model="dataForm.clubName" placeholder="社团名称"></el-input>
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
          clubId: '',
          status: '',
          studentNumber: '',
          studentName: '',
          clubName: ''
        },
        dataRule: {
          accountId: [
            { required: true, message: '账户编号不能为空', trigger: 'blur' }
          ],
          clubId: [
            { required: true, message: '社团编号不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '状态不能为空', trigger: 'blur' }
          ],
          studentNumber: [
            { required: true, message: '学号不能为空', trigger: 'blur' }
          ],
          studentName: [
            { required: true, message: '姓名不能为空', trigger: 'blur' }
          ],
          clubName: [
            { required: true, message: '社团名称不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/api/clubapply/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.accountId = data.clubApply.accountId
                this.dataForm.clubId = data.clubApply.clubId
                this.dataForm.status = data.clubApply.status
                this.dataForm.studentNumber = data.clubApply.studentNumber
                this.dataForm.studentName = data.clubApply.studentName
                this.dataForm.clubName = data.clubApply.clubName
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
              url: this.$http.adornUrl(`/api/clubapply/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'accountId': this.dataForm.accountId,
                'clubId': this.dataForm.clubId,
                'status': this.dataForm.status,
                'studentNumber': this.dataForm.studentNumber,
                'studentName': this.dataForm.studentName,
                'clubName': this.dataForm.clubName
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
