import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI, { Message } from 'element-ui'
import GLOBAL from '@/utils/global_variable'
import Fragment from 'vue-fragment'
import { MyComponent } from './components/index'
import { MyDirective } from './directive'
import './styles/index.scss'
import './styles/element-variables.scss'
import './permission'
require('./icons/index.js')
// 全局变量
Vue.prototype.GLOBAL = GLOBAL
Vue.prototype.$Tip = {
  success: (msg) => Message({
    message: msg,
    type: 'success'
  }),
  error: error => Message.error(error),
  warn: msg => Message({
    message: msg,
    type: 'warning'
  })
}

Vue.config.productionTip = false
Vue.use(ElementUI, {
  size: 'small'
})
Vue.use(MyComponent)
Vue.use(MyDirective)
Vue.use(Fragment.Plugin)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
