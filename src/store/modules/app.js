import { login, getUserInfo } from '@/api'
import { setToken } from '@/utils/auth'
import { routes } from '@/router/index'

const state = {
  userInfo: '',
  menu: {
    opened: false
  },
  permissionRoutes: routes[1].children,
  cachedViews: []
}

const mutations = {
  EXPAND (state) {
    state.menu.opened = !state.menu.opened
  },
  SET_USER_INFO (state, data) {
    state.userInfo = data
  }
}

const actions = {
  toLogin: ({ commit }, data) => {
    return new Promise(async (resolve) => {
      const res = await login(data)
      if (res.token) {
        setToken(res.token)
        resolve(res.token)
      }
    })
  },
  expand: ({ commit }) => {
    commit('EXPAND')
  },
  getUserInfo: ({ commit }) => {
    return new Promise(async resolve => {
      const userInfo = await getUserInfo()
      commit('SET_USER_INFO', userInfo)
      resolve(userInfo)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
