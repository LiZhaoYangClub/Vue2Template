import axios from 'axios'
import {
  getToken,
  removeToken
} from '@/utils/auth'
import {
  Message
} from 'element-ui'
const wait = 2000
let flag = true

const noAuth = () => {
  Message.error('没有访问权限，请重新登录！')
  const location = window.location.href.split('?')[0]
  const list = location.split('/')
  if (!list.includes('login')) {
    removeToken()
    window.location.reload()
  }
}

export const service = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? window.BASE_CONFIG.BASE_API : '',
  timeout: 5000
})

service.interceptors.request.use((config) => {
  if (getToken()) {
    // config.headers['X-Token'] = getToken()
    config.headers['X-Authorization'] = 'Bearer ' + getToken()
  }
  return config
}, error => {
  return Promise.reject(error)
})

service.interceptors.response.use((response) => {
  const {
    status,
    data
  } = response
  if (status === 200) {
    return data || {}
  } else if (status === 401) {
    return noAuth()
  } else {
    return Message.error('服务器异常，请稍后再试！')
  }
}, error => {
  if (flag) {
    flag = false
    const reg401 = /401/
    const reg500 = /500/
    if (reg401.test(error)) {
      return noAuth()
    }
    if (reg500.test(error)) {
      return Message.error('服务器异常，请稍后再试！')
    }
    setTimeout(() => {
      flag = true
    }, wait)
    return Promise.reject(error)
  }
})
