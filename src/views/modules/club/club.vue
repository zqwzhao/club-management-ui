<template>
  <div class="mod-config">
    <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()">
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="请输入社团名称" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="dataForm.key" placeholder="请输入社团类型" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="getDataList()">查询</el-button>
        <el-button v-if="isAuth('api:club:save')" type="primary" @click="addOrUpdateHandle()">新增</el-button>
        <el-button v-if="isAuth('api:club:batchAdd')" type="primary" @click="uploadHandle()">批量新增</el-button>
        <el-button v-if="isAuth('api:club:delete')" type="danger" @click="deleteHandle()" :disabled="dataListSelections.length <= 0">批量删除</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      @selection-change="selectionChangeHandle"
      style="width: 100%;">
      <el-table-column
        type="selection"
        header-align="center"
        align="center"
        width="50">
      </el-table-column>
      <el-table-column
        prop="clubId"
        header-align="center"
        align="center"
        label="社团编号">
      </el-table-column>
      <el-table-column
        prop="clubName"
        header-align="center"
        align="center"
        label="社团名称">
      </el-table-column>
      <el-table-column
        prop="clubType"
        header-align="center"
        align="center"
        label="社团类型">
      </el-table-column>
      <el-table-column
        prop="clubDescribe"
        header-align="center"
        align="center"
        label="社团描述">
      </el-table-column>
      <el-table-column prop="clubLogo" label="社团logo" min-width="45%" >
                 <!-- 图片的显示 -->
                 <template   slot-scope="scope">            
                    <img :src="scope.row.clubLogo"  min-width="100" height="100" />
                 </template>         
      </el-table-column> 
      <el-table-column
        prop="clubInstitute"
        header-align="center"
        align="center"
        label="社团机构">
      </el-table-column>
      <el-table-column
        prop="clubCreaterId"
        header-align="center"
        align="center"
        label="社团创建者id">
      </el-table-column>
      <el-table-column
        prop="clubQq"
        header-align="center"
        align="center"
        label="社团qq群号">
      </el-table-column>
      <el-table-column
        fixed="right"
        header-align="center"
        align="center"
        width="150"
        label="操作">
        <template slot-scope="scope">
          <el-button type="success" size="small" @click="addOrUpdateHandle(scope.row.clubId)">修改</el-button>
          <el-button type="info" size="small" @click="deleteHandle(scope.row.clubId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="pageIndex"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageSize"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper">
    </el-pagination>
    <!-- 弹窗, 新增 / 修改 -->
    <add-or-update v-if="addOrUpdateVisible" ref="addOrUpdate" @refreshDataList="getDataList"></add-or-update>
    <!-- 批量邢增弹窗 -->
    <upload v-if="uploadVisible" ref="upload" @refreshDataList="getDataList"></upload>
  </div>
</template>

<script>
  import AddOrUpdate from './club-add-or-update'
  import Upload from './club-upload'
  export default {
    data () {
      return {
        dataForm: {
          key: ''
        },
        fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
        dataList: [],
        pageIndex: 1,
        pageSize: 10,
        totalPage: 0,
        dataListLoading: false,
        dataListSelections: [],
        addOrUpdateVisible: false,
        uploadVisible: false
      }
    },
    components: {
      AddOrUpdate,
      Upload
    },
    activated () {
      this.getDataList()
    },
    methods: {
      // 获取数据列表
      getDataList () {
        this.dataListLoading = true
        this.$http({
          url: this.$http.adornUrl('/api/club/list'),
          method: 'get',
          params: this.$http.adornParams({
            'page': this.pageIndex,
            'limit': this.pageSize,
            'key': this.dataForm.key
          })
        }).then(({data}) => {
          if (data && data.code === 0) {
            this.dataList = data.page.list
            this.totalPage = data.page.totalCount
          } else {
            this.dataList = []
            this.totalPage = 0
          }
          this.dataListLoading = false
        })
      },
      // 每页数
      sizeChangeHandle (val) {
        this.pageSize = val
        this.pageIndex = 1
        this.getDataList()
      },
      // 当前页
      currentChangeHandle (val) {
        this.pageIndex = val
        this.getDataList()
      },
      // 多选
      selectionChangeHandle (val) {
        this.dataListSelections = val
      },
      // 新增 / 修改
      addOrUpdateHandle (id) {
        this.addOrUpdateVisible = true
        this.$nextTick(() => {
          this.$refs.addOrUpdate.init(id)
        })
      },
      // 上传文件
      uploadHandle () {
        this.uploadVisible = true
        this.$nextTick(() => {
          this.$refs.upload.init()
        })
      },
      // 删除
      deleteHandle (id) {
        var ids = id ? [id] : this.dataListSelections.map(item => {
          return item.clubId
        })
        this.$confirm(`确定对[id=${ids.join(',')}]进行[${id ? '删除' : '批量删除'}]操作?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http({
            url: this.$http.adornUrl('/api/club/delete'),
            method: 'post',
            data: this.$http.adornData(ids, false)
          }).then(({data}) => {
            if (data && data.code === 0) {
              this.$message({
                message: '操作成功',
                type: 'success',
                duration: 1500,
                onClose: () => {
                  this.getDataList()
                }
              })
            } else {
              this.$message.error(data.msg)
            }
          })
        })
      }
    }
  }
</script>
