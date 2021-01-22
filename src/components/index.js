const modules = require.context('./', true, /index\.vue$/)

const modulesAll = modules.keys().reduce((all, modulePath) => {
  // const path = modulePath.split('/')[1]
  const curModule = modules(modulePath).default
  const curName = curModule.name
  all[curName] = curModule
  return all
}, {})

export const MyComponent = {
  install: (Vue) => {
    Object.keys(modulesAll).forEach(module => {
      Vue.component(module, modulesAll[module])
    })
  }
}
