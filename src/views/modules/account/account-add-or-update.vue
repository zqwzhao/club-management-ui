<template>
  <el-dialog
    :title="!dataForm.accountId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="80px">
    <el-form-item label="学号" prop="studentNumber">
      <el-input v-model="dataForm.studentNumber" placeholder="学号"></el-input>
    </el-form-item>
    <el-form-item label="昵称" prop="nickname">
      <el-input v-model="dataForm.nickname" placeholder="昵称"></el-input>
    </el-form-item>
    <el-form-item label="手机号" prop="mobile">
      <el-input v-model="dataForm.mobile" placeholder="手机号"></el-input>
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-input v-model="dataForm.createTime" placeholder="创建时间"></el-input>
    </el-form-item>
    <el-form-item label="学生姓名" prop="studentName">
      <el-input v-model="dataForm.studentName" placeholder="学生姓名"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="gender">
      <el-select v-model="dataForm.gender" placeholder="请选择性别">
        <el-option
          v-for="item in genderOptionns"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="dataForm.gender" placeholder="性别"></el-input>
    </el-form-item>
    <el-form-item label="系别" prop="institute">
      <el-input v-model="dataForm.institute" placeholder="系别"></el-input>
    </el-form-item>
    <el-form-item label="专业" prop="major">
      <el-input v-model="dataForm.major" placeholder="专业"></el-input>
    </el-form-item>
    <el-form-item label="头像" prop="picture">
      <el-input v-model="dataForm.picture" placeholder="头像"></el-input>
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
          accountId: 0,
          studentNumber: '',
          password: '',
          nickname: '',
          mobile: '',
          createTime: '',
          studentName: '',
          gender: '',
          institute: '',
          major: '',
          picture: ''
        },
        dataRule: {
          studentNumber: [
            { required: true, message: '学号不能为空', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '密码不能为空', trigger: 'blur' }
          ],
          nickname: [
            { required: true, message: '昵称不能为空', trigger: 'blur' }
          ],
          mobile: [
            { required: true, message: '手机号不能为空', trigger: 'blur' }
          ],
          createTime: [
            { required: true, message: '创建时间不能为空', trigger: 'blur' }
          ],
          studentName: [
            { required: true, message: '学生姓名不能为空', trigger: 'blur' }
          ],
          gender: [
            { required: true, message: '性别不能为空', trigger: 'blur' }
          ],
          institute: [
            { required: true, message: '系别不能为空', trigger: 'blur' }
          ],
          class: [
            { required: true, message: '专业和班级不能为空', trigger: 'blur' }
          ],
          picture: [
            { required: true, message: '头像不能为空', trigger: 'blur' }
          ]
        },
        genderOptionns: [{
          value: '男',
          label: '男'
        }, {
          value: '女',
          label: '女'
        }]
      }
    },
    methods: {
      init (id) {
        this.dataForm.accountId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.accountId) {
            this.$http({
              url: this.$http.adornUrl(`/app/account/info/${this.dataForm.accountId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.studentNumber = data.account.studentNumber
                this.dataForm.nickname = data.account.nickname
                this.dataForm.mobile = data.account.mobile
                this.dataForm.createTime = data.account.createTime
                this.dataForm.studentName = data.account.studentName
                this.dataForm.gender = data.account.gender
                this.dataForm.institute = data.account.institute
                this.dataForm.major = data.account.major
                this.dataForm.picture = data.account.picture
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
              url: this.$http.adornUrl(`/app/account/${!this.dataForm.accountId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'accountId': this.dataForm.accountId || undefined,
                'studentNumber': this.dataForm.studentNumber,
                'nickname': this.dataForm.nickname,
                'mobile': this.dataForm.mobile,
                'createTime': this.dataForm.createTime,
                'studentName': this.dataForm.studentName,
                'gender': this.dataForm.gender,
                'institute': this.dataForm.institute,
                'major': this.dataForm.major,
                'picture': this.dataForm.picture
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
