// 正则表达式集合
// 密码校验规则(必须包含大写字母、小写字母、数字，特殊字符中的三种类型，不可包含汉字)
const passwordReg = new RegExp(/^(?![a-zA-Z]+$)(?![A-Z0-9]+$)(?![A-Z_!@#$%^&*`~()-+=]+$)(?![a-z0-9]+$)(?![a-z_!@#$%^&*`~()-+=]+$)(?![0-9_!@#$%^&*`~()-+=]+$)[a-zA-Z0-9_!@#$%^&*`~()-+=]{8,30}$/)
// 简单密码校验
const passwordLowReg = new RegExp(/^[a-zA-Z0-9_!@#$%^&*`~()-+=]{0,30}$/)
// ip地址校验规则（0.0.0.0）
const ipReg = new RegExp(/^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/)

// 网络地址校验规则 （0.0.0.0/24）
const ipRuleReg = new RegExp(/^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}\/(([0-2]?\d)|3[0-2])$/)

// 带端口的平台地址 （http://0.0.0.0:8000）
const urlReg = new RegExp(/^(http:\/\/)((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}(:([1-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))$/)
// 端口校验规则 (0-65535)
const portReg = new RegExp(/^(([1-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))$/)
// 域名地址规则 (xxx.xxx.xxx)
const addressReg = new RegExp(/^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/)

// 文件路径规则 (/xx/xx)
const pathReg = new RegExp(/^\/([\w-]+\/?)*$/)

// 带端口的监控地址 （0.0.0.0:8000）
const monitorUrlReg = new RegExp(/^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}(:([1-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))$/)

// 重定向url （http(s)://xxx.xxx.xx(:8000)/xxx）
const redirectUrlReg = new RegExp(/^(http(s)?:\/\/)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:([1-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?(\/([A-Za-z0-9_-]+\/?)*)?$/)

// git地址 （http(s)://xxx.xxx.xx(:8000)/xxx/xxx.git）
const gitAddressReg = new RegExp(/^(http(s)?:\/\/)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:([1-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5]))?(\/([A-Za-z0-9_-]+\/?)*)?(.git)$/)

// 编码只可以小写字母和数字
const containerCodeReg = new RegExp(/^[a-z][a-z0-9]{1,30}$/)

// git分支名称不可包含（'~', '^', spaces, '*', '?', ':'）
const branchNameReg = new RegExp(/^[^\s\\~\\^\\*\\?\\:\\\\/]+$/)

// 编码中不可包含汉字
const codeReg = new RegExp(/^[^\u4e00-\u9fa5]+$/)

// 集群名称正则表达式
const clusterNameReg = new RegExp(/^[a-z0-9]([-a-z0-9]*[a-z0-9])?(\.[a-z0-9]([-a-z0-9]*[a-z0-9])?)*$/)

// 数据库名称正则表达式
const mysqlNameReg = new RegExp(/^[_a-zA-Z@#][_a-zA-Z0-9@#$]{1,126}$/)

// 手机号码校验规则
const phoneNumReg = new RegExp(/^1[3|4|5|7|8|9][0-9]\d{8}$/)

// 电话号码数字-_
const telephoneDirectory = new RegExp(/^0\d{2,3}-?\d{7,8}$/g)

// 邮箱地址校验规则
const emailReg = new RegExp(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)

// 身份证号校验规则
const idReg = new RegExp(/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/)

// 非负整数
const numReg = new RegExp(/^\d+$/)

// 正整数
const positiveNumReg = new RegExp(/^[1-9]\d*$/)

// 端口+上下文（8081/test）
const portContextReg = new RegExp(/^(([1-9]|[1-9]\d{1,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])(\/([A-Za-z0-9_-]+\/?)*))$/)

// 特殊字符
const specialCharacterReg = new RegExp(/([`~!@#$%^&*()_\-+=<>?:"{}|,./;\\[\]'·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、])|(script)|(alert)|(%3c)|(%3e)|(img)|(src)|(svg)|(confirm)|(prompt)|(onload)|(xss)|(null)|(NULL)/ig)

// 特殊字符 （带下划线）
const specialLineChacracterReg = new RegExp(/([`~!@#$%^&*()\-+=<>?:"{}|,./;\\[\]'·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、])|(script)|(alert)|(%3c)|(%3e)|(img)|(src)|(svg)|(confirm)|(prompt)|(onload)|(xss)|(null)|(NULL)/ig)

// 特殊字符（能输入常用标点符号）
const descSpecialCharacterReg = new RegExp(/([`~!@$%^&*()+=./\\'·~！@￥%……&*（）+=])|(script)|(alert)|(%3c)|(%3e)|(img)|(src)|(svg)|(confirm)|(prompt)|(onload)|(xss)|(null)|(NULL)/ig)

// 邮件短信用特殊字符
const mailCharacterReg = new RegExp(/([`~!$%^&*()_\-+=<>?:"|,/;\\[\]'·~！￥%……&*（）——\-+=|《》？：“”【】、；‘’，。、])|(script)|(alert)|(%3c)|(%3e)|(img)|(src)|(svg)|(confirm)|(prompt)|(onload)|(xss)|(null)|(NULL)/ig)
// 验证邮箱格式特殊字符
const checkMailCharacterReg = new RegExp(/([`~!#$%^&*()+=<>?:"{}|,/;\\[\]'·~！#￥%……&*（）——+={}|《》？：“”【】、；‘’，。、])|(script)|(alert)|(%3c)|(%3e)|(img)|(src)|(svg)|(confirm)|(prompt)|(onload)|(xss)|(null)|(NULL)/ig)

// 编码特殊字符,只能字母数字-_
const codeSpecialCharacterReg = new RegExp(/[^A-Za-z0-9-_]/g)

// 只能数字
const figureReg = new RegExp(/[^0-9]/g)

// 超时阈值时间
const timeoutThreshold = new RegExp(/^([1-9]\d*|0)$/)

// 只能数字 -
const figureRulingReg = new RegExp(/[^0-9-]/g)

// 匹配首尾所有空格
const spaceTrimReg = new RegExp(/(^\s*)|(\s*$)/g)

// 英文+数字
const customerLevelReg = new RegExp(/^[A-Za-z0-9]{1,}$/)

// 查询邮箱
const emailsReg = new RegExp(/^[A-Za-z0-9@\\.]{0,}$/)

export { timeoutThreshold, figureRulingReg, figureReg, telephoneDirectory, emailsReg, customerLevelReg, portContextReg, ipReg, ipRuleReg, urlReg, portReg, addressReg, pathReg, monitorUrlReg, redirectUrlReg, passwordReg, passwordLowReg, codeReg, clusterNameReg, mysqlNameReg, gitAddressReg, containerCodeReg, branchNameReg, phoneNumReg, idReg, numReg, positiveNumReg, specialCharacterReg, descSpecialCharacterReg, mailCharacterReg, spaceTrimReg, codeSpecialCharacterReg, emailReg, checkMailCharacterReg, specialLineChacracterReg }
