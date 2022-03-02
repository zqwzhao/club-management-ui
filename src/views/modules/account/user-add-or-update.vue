<template>
  <el-dialog
    :title="!dataForm.userId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="用户名" prop="username">
      <el-input v-model="dataForm.username" placeholder="用户名"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input v-model="dataForm.password" placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="userGender">
      <el-input v-model="dataForm.userGender" placeholder="性别"></el-input>
    </el-form-item>
    <el-form-item label="系别" prop="userInstitute">
      <el-input v-model="dataForm.userInstitute" placeholder="系别"></el-input>
    </el-form-item>
    <el-form-item label="专业和班级" prop="userClass">
      <el-input v-model="dataForm.userClass" placeholder="专业和班级"></el-input>
    </el-form-item>
    <el-form-item label="学号" prop="userStudentNumber">
      <el-input v-model="dataForm.userStudentNumber" placeholder="学号"></el-input>
    </el-form-item>
    <el-form-item label="微信openid" prop="userOpenId">
      <el-input v-model="dataForm.userOpenId" placeholder="微信openid"></el-input>
    </el-form-item>
    <el-form-item label="微信验证消息" prop="userAvatar">
      <el-input v-model="dataForm.userAvatar" placeholder="微信验证消息"></el-input>
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
          userId: 0,
          username: '',
          mobile: '',
          password: '',
          createTime: '',
          userGender: '',
          userInstitute: '',
          userClass: '',
          userStudentNumber: '',
          userOpenId: '',
          userAvatar: ''
        },
        dataRule: {
          username: [
            { required: true, message: '用户名不能为空', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '手机号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          userGender: [
            { required: true, message: '性别不能为空', trigger: 'blur' }
          ],
          userInstitute: [
            { required: true, message: '系别不能为空', trigger: 'blur' }
          ],
          userClass: [
            { required: true, message: '专业和班级不能为空', trigger: 'blur' }
          ],
          userStudentNumber: [
            { required: true, message: '学号不能为空', trigger: 'blur' }
          ],
          userOpenId: [
            { required: true, message: '微信openid不能为空', trigger: 'blur' }
          ],
          userAvatar: [
            { required: true, message: '微信验证消息不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.userId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.userId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/user/info/${this.dataForm.userId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.username = data.user.username
                this.dataForm.mobile = data.user.mobile
                this.dataForm.password = data.user.password
                this.dataForm.createTime = data.user.createTime
                this.dataForm.userGender = data.user.userGender
                this.dataForm.userInstitute = data.user.userInstitute
                this.dataForm.userClass = data.user.userClass
                this.dataForm.userStudentNumber = data.user.userStudentNumber
                this.dataForm.userOpenId = data.user.userOpenId
                this.dataForm.userAvatar = data.user.userAvatar
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
              url: this.$http.adornUrl(`/generator/user/${!this.dataForm.userId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'userId': this.dataForm.userId || undefined,
                'username': this.dataForm.username,
                'mobile': this.dataForm.mobile,
                'password': this.dataForm.password,
                'createTime': this.dataForm.createTime,
                'userGender': this.dataForm.userGender,
                'userInstitute': this.dataForm.userInstitute,
                'userClass': this.dataForm.userClass,
                'userStudentNumber': this.dataForm.userStudentNumber,
                'userOpenId': this.dataForm.userOpenId,
                'userAvatar': this.dataForm.userAvatar
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
