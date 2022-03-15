<template>
  <el-dialog
    :title="!dataForm.id ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="学号" prop="accountId">
      <el-input v-model="dataForm.accountId" placeholder="学号"></el-input>
    </el-form-item>
    <el-form-item label="社团id" prop="clubId">
      <el-input v-model="dataForm.clubId" placeholder="社团id"></el-input>
    </el-form-item>
    <el-form-item label="0 审批中 1 通过 2 不通过" prop="status">
      <el-input v-model="dataForm.status" placeholder="0 审批中 1 通过 2 不通过"></el-input>
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
          status: ''
        },
        dataRule: {
          accountId: [
            { required: true, message: '学号不能为空', trigger: 'blur' }
          ],
          clubId: [
            { required: true, message: '社团id不能为空', trigger: 'blur' }
          ],
          status: [
            { required: true, message: '0 审批中 1 通过 2 不通过不能为空', trigger: 'blur' }
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
              url: this.$http.adornUrl(`/generator/clubapply/info/${this.dataForm.id}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.accountId = data.clubApply.accountId
                this.dataForm.clubId = data.clubApply.clubId
                this.dataForm.status = data.clubApply.status
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
              url: this.$http.adornUrl(`/generator/clubapply/${!this.dataForm.id ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'id': this.dataForm.id || undefined,
                'accountId': this.dataForm.accountId,
                'clubId': this.dataForm.clubId,
                'status': this.dataForm.status
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
