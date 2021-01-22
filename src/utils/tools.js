
const UUID = require('uuidjs')

/**
 * 生成随机ID
 */
const makeId = function () {
  return UUID.genV1().toString()
}

const getTextWidth = function (text) {
  let i = text.length
  let width = 0
  while (i) {
    const char = text.charAt(i - 1)
    if (char.charCodeAt() > 126) {
      width += 13
    } else {
      width += 9
    }
    i--
  }
  return width
}

const type = {
  INPUT: 'INPUT',
  FUNCTION: 'FUNCTION',
  ACTION: 'ACTION'
}

const bgColor = {
  ACTION: '#f1918f', // 动作
  EXTERNAL: '#fbc767', //  外部的
  TRANSFORMATION: '#7acef1', // 变换
  FILTER: '#f0e861', // 滤波器
  CHAINS: '#d6c4f1' // 规则链
}

const icon = {
  DEVICE: require('@/icons/svg/device.svg'),
  INPUT: require('@/icons/svg/device.svg'),
  CUSTOM_DATA: require('@/assets/images/online.png'),
  FILTER: require('@/icons/svg/filter.svg'),
  TRANSFORMATION: require('@/icons/svg/transform.svg'),
  ACTION: require('@/icons/svg/action.svg'),
  EXTERNAL: require('@/icons/svg/outer.svg'),
  ENRICHMENT: require('@/icons/svg/attr.svg')
}

const name = {
  DEVICE: '设备数据',
  CUSTOM_DATA: '自定义数据',
  FILTER: '逻辑规则',
  TRANSFORMATION: '四则运算',
  ACTION: 'APP推送',
  EXTERNAL: 'HTTP请求',
  ENRICHMENT: '邮件'
}

const portDelta = {
  INPUT_X: 0,
  Y: 15
}

const editIcons = {
  edit: require('@/assets/images/edit.svg'),
  cancel: require('@/assets/images/cancel.svg')
}

const LISTS = {
  ACTION: [], // 动作
  //  "ENRICHMENT":[],// 属性集
  EXTERNAL: [], //  外部的
  TRANSFORMATION: [], // 变换
  FILTER: [], // 滤波器
  CHAINS: [] // 规则链
}

export {
  LISTS,
  type,
  bgColor,
  icon,
  name,
  portDelta,
  editIcons,
  makeId,
  getTextWidth
}
