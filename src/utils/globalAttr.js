// 输入框限制长度
export const maxLength = 180
// 短信模板内容输入框限制长度
export const smsMaxLength = 180
// 一年的分钟数
export const oneYear = 52560
// 组织、网络增加时输入框限制长度
export const maxInputLength = 30
// 手机号长度控制
export const phoneMaxLength = 15
// 姓名长度控制
export const nameMaxLength = 20
// 编码长度控制
export const codeMaxLength = 30
// 编码文本输入框长度控制
export const textareaMaxLength = 4000
// 文本省略长度
export const ellipsisMaxLength = 35
// 允许上传的文件类型
export const allowUploadFileType = ['doc', 'docx', 'pdf', 'txt', 'jpg', 'jpeg', 'png', 'bmp', 'xls', 'xlsx', 'wps']
// 栅格布局
export const labelCol = {
  xs: { span: 24 },
  sm: { span: 6 }
}
export const wrapperCol = {
  xs: { span: 24 },
  sm: { span: 18 }
}
export const labelRowCol = {
  xs: { span: 24 },
  sm: { span: 4 }
}
export const wrapperRowCol = {
  xs: { span: 24 },
  sm: { span: 20 }
}
export const labelColSm2 = {
  xs: { span: 24 },
  sm: { span: 2 }
}
export const labelColSm3 = {
  xs: { span: 24 },
  sm: { span: 3 }
}
export const labelColSm4 = {
  xs: { span: 24 },
  sm: { span: 4 }
}
export const labelColSm5 = {
  xs: { span: 24 },
  sm: { span: 5 }
}
export const labelColSm7 = {
  xs: { span: 24 },
  sm: { span: 7 }
}
export const labelColSm8 = {
  xs: { span: 24 },
  sm: { span: 8 }
}
export const labelColSm9 = {
  xs: { span: 24 },
  sm: { span: 9 }
}
export const labelColSm10 = {
  xs: { span: 24 },
  sm: { span: 10 }
}
export const wrapperColSm14 = {
  xs: { span: 24 },
  sm: { span: 14 }
}
export const wrapperColSm15 = {
  xs: { span: 24 },
  sm: { span: 15 }
}
export const wrapperColSm16 = {
  xs: { span: 24 },
  sm: { span: 16 }
}
export const wrapperColSm17 = {
  xs: { span: 24 },
  sm: { span: 17 }
}
export const wrapperColSm18 = {
  xs: { span: 24 },
  sm: { span: 18 }
}
export const wrapperColSm19 = {
  xs: { span: 24 },
  sm: { span: 19 }
}
export const wrapperColSm20 = {
  xs: { span: 24 },
  sm: { span: 20 }
}
export const wrapperColSm21 = {
  xs: { span: 24 },
  sm: { span: 21 }
}
export const wrapperColSm22 = {
  xs: { span: 24 },
  sm: { span: 22 }
}
export const zero = 0
// 状态色
export const statusColor = {
  success: 'green',
  running: 'lime',
  fail: 'volcano',
  normal: 'blue',
  error: 'red',
  warning: 'orange'
}
// 时间
export const dateTimeFormat = 'YYYY-MM-DD HH:mm:ss'
export const dateTimeStandard = 'YYYY-MM-DD'
// 图标大小
export const iconSize = '18px'
export const iconFontSize = '22px'
export const redIconColor = 'red'
// 未启动 已激活 已关闭
export const closed = 'CLOSED'
export const noIinitated = 'NOT_INITIATED'
export const activated = 'ACTIVATED'
// 系统 Id
export const systemId = {
  PLATFORM_SYSTEM_ID: 1000,
  VDC_SYSTEM_ID: 1001,
  TEAM_SPACE_SYSTEM_ID: 1002
}

// cron备份周期
export const cronCycleList = [{
  name: '星期日',
  value: '1'
}, {
  name: '星期一',
  value: '2'
}, {
  name: '星期二',
  value: '3'
}, {
  name: '星期三',
  value: '4'
}, {
  name: '星期四',
  value: '5'
}, {
  name: '星期五',
  value: '6'
}, {
  name: '星期六',
  value: '7'
}]

// 报表类型
export const reportChartType = {
  BASIC_PIE: 'BasicPie', // 基础饼图
  BASIC_ANNULAR: 'BasicAnnular', // 基础环形图
  BASIC_BAR: 'BasicBar', // 基础环形图
  BASIC_LINE: 'BasicLine', // 基础折线图
  COMPLEX_LINE: 'ComplexLine', // 多条折线图
  GROUP_BAR: 'GroupBar', // 分组柱状图
  STACK_BAR: 'StackBar', // 堆叠柱状图
  MULTICOLOR_ROSE_PIE: 'MulticolorRosePie', // 多色南丁格尔玫瑰图
  BASIC_AREA: 'BasicArea', // 基础面积图
  BASIC_DOT: 'BasicDot' // 散点图
}

// 公共代码
export const commonCode = {
  DEFECTTYPE: 'defectType',
  MOUDLE: 'module',
  DEFECTCOMPLEXITY: 'defectComplexity',
  DEFECTSEVERITY: 'defectSeverity',
  DEFECTSTATUS: 'defectStatus',
  OG_UNIT: 'OG_UNIT' // 运维组单位
}

export const operateType = {
  ADD: 'ADD', // 新增
  UPDATE: 'UPDATE', // 修改
  DEFECT: 'DEFECT' // 缺陷
}

// 一体化展示
export const timeChangeList = [
  {
    name: '近一小时',
    code: 'HOUR'
  },
  {
    name: '本日',
    code: 'DAY'
  },
  {
    name: '本月',
    code: 'MONTH'
  },
  {
    name: '本年',
    code: 'YEAR'
  }
]
