<template>
  <el-dialog
    title="上传文件"
    :close-on-click-modal="false"
    @close="closeHandle"
    :visible.sync="visible">
    <el-upload
      drag
      :action="url"
      :before-upload="beforeUploadHandle"
      :on-success="successHandle"
      multiple
      :file-list="fileList"
      style="text-align: center;">
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
     <div class="el-upload__tip" slot="tip">只支持Excel文件（.xlsx格式）！文件大小不能大于10MB</div>
    </el-upload>
  </el-dialog>
</template>

<script>
  export default {
    data () {
      return {
        visible: false,
        url: '',
        num: 0,
        successNum: 0,
        fileList: []
      }
    },
    methods: {
      init (id) {
        this.url = this.$http.adornUrl(`/api/club/upload/clubs?token=${this.$cookie.get('token')}`)
        this.visible = true
      },
      // 上传之前
      beforeUploadHandle (file) {
        let extension = file.name.substring(file.name.lastIndexOf('.') + 1)
        let size = file.size / 1024 / 1024
        if (extension !== 'xlsx') {
          this.$notify.warning({
            title: '警告',
            message: `只能上传Excel2017（即后缀是.xlsx）的文件`
          })
        }
        if (size > 10) {
          this.$notify.warning({
            title: '警告',
            message: `文件大小不得超过10M`
          })
        }
        this.num++
      },
      // 上传成功
      successHandle (response, file, fileList) {
        this.fileList = fileList
        if (response && response.code === 0) {
          this.$notify.success({
            title: '成功',
            message: `文件上传成功`
          })
        } else {
          this.$message.error(response.msg)
        }
      },
      // 弹窗关闭时
      closeHandle () {
        this.fileList = []
        this.$emit('refreshDataList')
      }
    }
  }
</script>
