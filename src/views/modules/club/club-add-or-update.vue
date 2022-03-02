<template>
  <el-dialog
    :title="!dataForm.clubId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="130px">
    <el-form-item label="社团名称" prop="clubName">
      <el-input v-model="dataForm.clubName" placeholder="社团名称"></el-input>
    </el-form-item>
    <el-form-item label="社团类型" prop="clubType">
      <el-input v-model="dataForm.clubType" placeholder="社团类型"></el-input>
    </el-form-item>
    <el-form-item label="社团描述" prop="clubDescribe">
      <el-input v-model="dataForm.clubDescribe" placeholder="社团描述"></el-input>
    </el-form-item>
    <el-form-item label="社团Logo" prop="clubLogo">
      <el-input v-model="dataForm.clubLogo" placeholder="社团Logo"></el-input>
    </el-form-item>
    <el-form-item label="社团建立时间" prop="clubEstablishTime">
      <el-date-picker v-model="dataForm.clubEstablishTime" type="date"  placeholder="社团建立时间"  format="yyyy-MM-dd">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="社团机构" prop="clubInstitute">
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-input v-model="dataForm.clubInstitute" placeholder="社团机构"></el-input>
    </el-form-item>
    <el-form-item label="社团创建者" prop="clubCreaterId">
      <el-input v-model="dataForm.clubCreaterId" placeholder="社团创建者"></el-input>
    </el-form-item>
    <el-form-item label="社团QQ群号" prop="clubQq">
      <el-input v-model="dataForm.clubQq" placeholder="社团QQ群号"></el-input>
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
          clubId: 0,
          clubName: '',
          clubType: '',
          clubDescribe: '',
          clubLogo: '',
          clubEstablishTime: '',
          clubInstitute: '',
          clubCreaterId: '',
          clubQq: ''
        },
        dataRule: {
          clubName: [
            { required: true, message: '社团名称不能为空', trigger: 'blur' }
          ],
          clubType: [
            { required: true, message: '社团类型不能为空', trigger: 'blur' }
          ],
          clubDescribe: [
            { required: true, message: '社团描述不能为空', trigger: 'blur' }
          ],
          clubLogo: [
            { required: true, message: '社团logo不能为空', trigger: 'blur' }
          ],
          clubEstablishTime: [
            { required: true, message: '社团建立时间不能为空', trigger: 'blur' }
          ],
          clubInstitute: [
            { required: true, message: '社团机构不能为空', trigger: 'blur' }
          ],
          clubCreaterId: [
            { required: true, message: '社团创建者id不能为空', trigger: 'blur' }
          ],
          clubQq: [
            { required: true, message: '社团qq群号不能为空', trigger: 'blur' }
          ]
        },
        options: [{
          value: '选项1',
          label: '计算机与信息系'
        }, {
          value: '选项2',
          label: '人文系'
        }, {
          value: '选项3',
          label: '教育系'
        }]
      }
    },
    methods: {
      init (id) {
        this.dataForm.clubId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.clubId) {
            this.$http({
              url: this.$http.adornUrl(`/generator/club/info/${this.dataForm.clubId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.clubName = data.club.clubName
                this.dataForm.clubType = data.club.clubType
                this.dataForm.clubDescribe = data.club.clubDescribe
                this.dataForm.clubLogo = data.club.clubLogo
                this.dataForm.clubEstablishTime = data.club.clubEstablishTime
                this.dataForm.clubInstitute = data.club.clubInstitute
                this.dataForm.clubCreaterId = data.club.clubCreaterId
                this.dataForm.clubQq = data.club.clubQq
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
              url: this.$http.adornUrl(`/generator/club/${!this.dataForm.clubId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'clubId': this.dataForm.clubId || undefined,
                'clubName': this.dataForm.clubName,
                'clubType': this.dataForm.clubType,
                'clubDescribe': this.dataForm.clubDescribe,
                'clubLogo': this.dataForm.clubLogo,
                'clubEstablishTime': this.dataForm.clubEstablishTime,
                'clubInstitute': this.dataForm.clubInstitute,
                'clubCreaterId': this.dataForm.clubCreaterId,
                'clubQq': this.dataForm.clubQq
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
