const VR = {
  modelName: (rule, value, callback) => {
    if (!value) {
      callback(new Error('名称不能为空'))
    } else if (!checkSpecialKey(value)) {
      callback(new Error('不能含有特殊字符！！'))
    } else if (value.length > 25) {
      callback(new Error('不能超过25个字符！！'))
    } else {
      callback()
    }
  },
  latitude: (rule, value, callback) => {
    if (!value) {
      callback(new Error('纬度名称不能为空'))
    } else if (!checkSpecialKey(value)) {
      callback(new Error('不能含有特殊字符！！'))
    } else if (value.length > 25) {
      callback(new Error('不能超过25个字符！！'))
    } else {
      callback()
    }
  },
  longitude: (rule, value, callback) => {
    if (!value) {
      callback(new Error('经度名称不能为空'))
    } else if (!checkSpecialKey(value)) {
      callback(new Error('不能含有特殊字符！！'))
    } else if (value.length > 25) {
      callback(new Error('不能超过25个字符！！'))
    } else {
      callback()
    }
  }
}
const Rules = {
  label: [{
    validator: VR.modelName,
    trigger: 'blur',
    required: true
  }], // 不能包含特殊字符，且字符长度不大于25
  latitudeKeyName: [{
    validator: VR.latitude,
    trigger: 'blur',
    required: true
  }], // 不能包含特殊字符，且字符长度不大于25
  longitudeKeyName: [{
    validator: VR.longitude,
    trigger: 'blur',
    required: true
  }], // 不能包含特殊字符，且字符长度不大于25
  tableName: [{
    validator: VR.modelName,
    trigger: 'blur',
    required: true
  }], // 不能包含特殊字符，且字符长度不大于25
  telemetryPrefix: [{
    validator: VR.modelName,
    trigger: 'blur',
    required: true
  }], // 不能包含特殊字符，且字符长度不大于25
  centerLatitude: [{
    required: true,
    message: '请输入圆心纬度',
    trigger: 'blur'
  }],
  centerLongitude: [{
    required: true,
    message: '请输入圆心经度',
    trigger: 'blur'
  }],
  range: [{
    required: true,
    message: '请输入圆半径',
    trigger: 'blur'
  }],
  rangeUnit: [{
    required: true,
    message: '请输入单位',
    trigger: 'change'
  }],
  perimeterType: [{
    required: true,
    message: '请选择类型',
    trigger: 'change'
  }],
  direction: [{
    required: true,
    message: '请选择方向',
    trigger: 'change'
  }],
  entityType: [{
    required: true,
    message: '请选择类型',
    trigger: 'change'
  }],
  entityId: [{
    required: true,
    message: '请选择',
    trigger: 'change'
  }],
  severity: [{
    required: true,
    message: '请选择',
    trigger: 'change'
  }],
  originatorType: [{
    required: true,
    message: '请选择类型',
    trigger: 'change'
  }],
  originatorId: [{
    required: true,
    message: '请选择',
    trigger: 'change'
  }],
  selectedRuleChain: [{
    required: true,
    message: '请选择',
    trigger: 'change'
  }],
  entityNamePattern: [{
    required: true,
    message: '必填',
    trigger: 'blur'
  }],
  entityTypePattern: [{
    required: true,
    message: '必填',
    trigger: 'blur'
  }],
  customerNamePattern: [{
    required: true,
    message: '必填',
    trigger: 'blur'
  }],
  polygonsDefinition: [{
    required: true,
    message: '请输入多边形坐标',
    trigger: 'blur'
  }]
}
/**
 * 特殊字符校验
 * @param {*} str
 */
function checkSpecialKey(str) {
  // var specialKey = "[`~!#$^&*()=|{}':;'\\[\\].<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]‘'"
  var specialKey = ''
  for (var i = 0; i < str.length; i++) {
    if (specialKey.indexOf(str.substr(i, 1)) !== -1) {
      return false
    }
  }
  return true
}

export default Rules
