import router from './router'
import store from './store'
import { removeToken, getToken } from '@/utils/auth'

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      next({
        path: '/'
      })
    } else {
      const userInfo = store.getters.userInfo
      if (JSON.stringify(userInfo) !== '{}') {
        next()
      } else {
        try {
          await store.dispatch('app/getUserInfo')
          // const accessRoutes = await store.dispatch('permission/generateRoutes', roles)
          // router.addRoute(accessRoutes)
          next({
            ...to,
            replace: true
          })
        } catch (error) {
          removeToken()
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next(`/login?redirect=${to.path}`)
    }
  }
})
