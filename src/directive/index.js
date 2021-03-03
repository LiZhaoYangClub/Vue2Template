const modules = require.context('./', true, /index\.js$/)

const modulesAll = modules.keys().reduce((all, modulePath) => {
  const path = modulePath.split('/')[1]
  const curModule = modules(modulePath).default
  if (path !== 'index.js') all.push(curModule)
  return all
}, [])

export const MyDirective = {
  install: (Vue) => {
    modulesAll.forEach(directive => {
      Vue.use(directive)
    })
  }
}
