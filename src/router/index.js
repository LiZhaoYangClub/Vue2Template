import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/layout/index.vue'

Vue.use(VueRouter)

// vue-router@3.0版本及以上回调形式已经改成promise api的形式了，返回的是一个promise，如果路由地址跳转相同, 且没有捕获到错误，控制台始终会出现如图所示的警告 （注：3.0以下版本则不会出现以下警告！！！，因路由回调问题…）
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/login/index.vue')
  },
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        // hidden: true,
        component: () => import(/* webpackChunkName: "ruleList" */ '@/views/test/index.vue'),
        meta: {
          icon: 'code-working',
          title: 'Home'
        }
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
