import vueSticky from './sticky'

const VueSticky = {
  install: Vue => {
    Vue.directive('sticky', vueSticky)
  }
}

export default VueSticky
