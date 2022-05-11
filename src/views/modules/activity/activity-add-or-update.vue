<template>
  <el-dialog
    :title="!dataForm.activityId ? '新增' : '修改'"
    :close-on-click-modal="false"
    :visible.sync="visible">
    <el-form :model="dataForm" :rules="dataRule" ref="dataForm" @keyup.enter.native="dataFormSubmit()" label-width="130px">
    <el-form-item label="活动名称" prop="activityName">
      <el-input v-model="dataForm.activityName" placeholder="活动名称"></el-input>
    </el-form-item>
    <el-form-item label="活动开始时间" prop="activityStartTime">
      <el-date-picker
        v-model="dataForm.activityStartTime"
        type="datetime"
        placeholder="选择开始时间"
        value-format="yyyy-MM-dd hh:mm:ss"
        :picker-options="pickerOptions0"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="活动结束时间" prop="activityEndTime">
       <el-date-picker
          v-model="dataForm.activityEndTime"
          type="datetime"
          placeholder="选择结束日期"
          value-format="yyyy-MM-dd hh:mm:ss"
          :picker-options="pickerOptions1"
      ></el-date-picker>
    </el-form-item>
    <el-form-item label="活动描述" prop="activityDescribe">
      <el-input
      type="textarea"
      :rows="3"
      placeholder="请输入活动描述"
      v-model="dataForm.activityDescribe">
      </el-input>
    </el-form-item>
    <el-form-item label="活动图片" prop="activityImage">
      <el-input placeholder="请输入活动图片URL地址" v-model="dataForm.activityImage">
      </el-input>
    </el-form-item>
    <el-form-item label="活动奖励" prop="activityReward">
      <el-input type="textarea" :rows="2" v-model="dataForm.activityReward" placeholder="活动奖励"></el-input>
    </el-form-item>
    <el-form-item label="活动人数" prop="activityPeople">
      <el-input-number v-model="dataForm.activityPeople" placeholder="活动人数" step="1" min="0" max="1000"></el-input-number>
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
          activityId: 0,
          activityName: '',
          activityStartTime: '',
          activityEndTime: '',
          activityDescribe: '',
          activityImage: '',
          activityReward: '',
          activityPeople: '',
          activityStatus: '',
          activityCreaterId: '',
          activityPosition: ''
        },
        dataRule: {
          activityName: [
            { required: true, message: '活动名称不能为空', trigger: 'blur' }
          ],
          activityStartTime: [
            { required: true, message: '请选择开始时间', trigger: ['blur', 'change'] }
          ],
          activityEndTime: [
            { required: true, message: '请选择结束时间', trigger: ['blur', 'change'] }
          ],
          activityDescribe: [
            { required: true, message: '活动描述不能为空', trigger: 'blur' }
          ],
          activityImage: [
            { required: true, message: '活动图片不能为空', trigger: 'blur' }
          ],
          activityReward: [
            { required: false, message: '活动奖励不能为空', trigger: 'blur' }
          ],
          activityPeople: [
            { required: true, message: '活动人数不能为空', trigger: 'blur' }
          ],
          activityStatus: [
            { required: true, message: '活动状态不能为空', trigger: 'blur' }
          ],
          activityCreaterId: [
            { required: true, message: '活动创建者不能为空', trigger: 'blur' }
          ],
          activityPosition: [
            { required: true, message: '活动地点不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    omputed: {
      editStartOptions: {
        disabledDate: time => {
          if (!this.insertForm.endTime) {
            // 禁止选择1970年以前的日期
            return time.getTime() < new Date(1970 - 1 - 1).getTime()
          } else {
            // 开始时间要大于结束时间
            return time.getTime() > new Date(this.dataForm.activityEndTime)
          }
        }
      },
      editStopOptions: {
        disabledDate: time => {
          return (
            // 禁止选择1970年以前的日期
            time.getTime() < new Date(this.dataForm.activityStartTime) ||
            time.getTime() < new Date(1970 - 1 - 1).getTime()
          )
        }
      }
    },
    methods: {
      init (id) {
        this.dataForm.activityId = id || 0
        this.visible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].resetFields()
          if (this.dataForm.activityId) {
            this.$http({
              url: this.$http.adornUrl(`/api/activity/info/${this.dataForm.activityId}`),
              method: 'get',
              params: this.$http.adornParams()
            }).then(({data}) => {
              if (data && data.code === 0) {
                this.dataForm.activityName = data.activity.activityName
                this.dataForm.activityStartTime = data.activity.activityStartTime
                this.dataForm.activityEndTime = data.activity.activityEndTime
                this.dataForm.activityDescribe = data.activity.activityDescribe
                this.dataForm.activityImage = data.activity.activityImage
                this.dataForm.activityReward = data.activity.activityReward
                this.dataForm.activityPeople = data.activity.activityPeople
                this.dataForm.activityStatus = data.activity.activityStatus
                this.dataForm.activityCreaterId = data.activity.activityCreaterId
                this.dataForm.activityCover = data.activity.activityCover
                this.dataForm.activityPosition = data.activity.activityPosition
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
              url: this.$http.adornUrl(`/api/activity/${!this.dataForm.activityId ? 'save' : 'update'}`),
              method: 'post',
              data: this.$http.adornData({
                'activityId': this.dataForm.activityId || undefined,
                'activityName': this.dataForm.activityName,
                'activityStartTime': this.dataForm.activityStartTime,
                'activityEndTime': this.dataForm.activityEndTime,
                'activityDescribe': this.dataForm.activityDescribe,
                'activityImage': this.dataForm.activityImage,
                'activityReward': this.dataForm.activityReward,
                'activityPeople': this.dataForm.activityPeople,
                'activityStatus': this.dataForm.activityStatus,
                'activityCreaterId': this.dataForm.activityCreaterId,
                'activityCover': this.dataForm.activityCover,
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
