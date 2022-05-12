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
       <el-select v-model="dataForm.clubType" placeholder="请选择社团类型">
        <el-option
          v-for="item in clubTypeOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="社团描述" prop="clubDescribe">
      <el-input v-model="dataForm.clubDescribe" placeholder="社团描述"></el-input>
    </el-form-item>
    <el-form-item label="社团Logo" prop="clubLogo">
      <el-input v-model="dataForm.clubLogo" placeholder="社团Logo"></el-input>
    </el-form-item>
    <el-form-item label="社团人数" prop="clubPeople">
      <el-input-number v-model="dataForm.clubPeople" placeholder="" :step="1" min="0" max="1000"></el-input-number>
    </el-form-item>
    <el-form-item label="社团机构" prop="clubInstitute">
      <el-select v-model="dataForm.clubInstitute" placeholder="请选择社团机构">
        <el-option
          v-for="item in clubInstituteOptionns"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
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
  import { specialCharacterReg } from '@/utils/regRules'
  export default {
    data () {
      return {
        visible: false,
        specialCharacterReg,
        dataForm: {
          clubId: 0,
          clubName: '',
          clubType: '',
          clubDescribe: '',
          clubLogo: '',
          clubPeople: '',
          clubInstitute: '',
          clubCreaterId: '',
          clubQq: ''
        },
        dataRule: {
          clubName: [
            { required: true, message: '社团名称不能为空', trigger: 'blur' },
            { message: '请勿输入特殊字符', trigger: ['blur', 'change'], pattern: /^[^`\t+\n+\s+~!#$%^&*()+=<>?:"{}|,./;'\\[\]·~！#￥%……&*（）——+={}|《》？：“”【】、；‘'，。、]*$/ }
          ],
          clubType: [
            { required: true, message: '请选择社团类型', trigger: 'blur' }
          ],
          clubDescribe: [
            { required: true, message: '社团描述不能为空', trigger: 'blur' }
          ],
          clubLogo: [
            { required: true, message: '社团logo不能为空', trigger: 'blur' }
          ],
          clubPeople: [
            { required: true, message: '社团人数', trigger: 'blur' }
          ],
          clubInstitute: [
            { required: true, message: '社团机构不能为空', trigger: 'blur' }
          ],
          clubCreaterId: [
            { required: true, message: '社团创建者id不能为空', trigger: 'blur' }
          ],
          clubQq: [
            { required: true, message: '社团qq群号不能为空', trigger: 'blur' },
            { message: '请勿输入特殊字符', trigger: ['blur', 'change'], pattern: /^[^`\t+\n+\s+~!#$%^&*()+=<>?:"{}|,./;'\\[\]·~！#￥%……&*（）——+={}|《》？：“”【】、；‘'，。、]*$/ }
          ]
        },
        clubTypeOptions: [{
          value: '校园管理类',
          label: '校园管理类'
        }, {
          value: '文化体育类',
          label: '文化体育类'
        }, {
          value: '创新创业类',
          label: '创新创业类'
        }, {
          value: '学术科技类',
          label: '学术科技类'
        }, {
          value: '兴趣爱好类',
          label: '兴趣爱好类'
        }],
        clubInstituteOptionns: [{
          value: '软件工程系',
          label: '软件工程系'
        }, {
          value: '教育系',
          label: '教育系'
        }, {
          value: '武装部',
          label: '武装部'
        }, {
          value: '经贸系',
          label: '经贸系'
        }, {
          value: '学生会',
          label: '学生会'
        }],
        clubTypeValue: '',
        clubInstituteValue: '',
        imageUrl: '',
        tempUrl: ''
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
              url: this.$http.adornUrl(`/api/club/info/${this.dataForm.clubId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.clubName = data.club.clubName
                this.dataForm.clubType = data.club.clubType
                this.dataForm.clubDescribe = data.club.clubDescribe
                this.dataForm.clubLogo = data.club.clubLogo
                this.dataForm.clubPeople = data.club.clubPeople
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
                'clubPeople': this.dataForm.clubPeople,
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
