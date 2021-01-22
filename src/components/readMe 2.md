## 组件命名 `ak-组件文件夹名称`

```html
  <ak-pagination />
```
## 拖拽插件 [sortableJS](http://www.sortablejs.com/index.html)

## 实现复制功能
```html
<el-button v-clipboard:copy="inputData" v-clipboard:success="clipboardSuccess" type="primary" icon="el-icon-document">
  copy
</el-button>
```
#### install
`npm i clipboard -S`
```js
import clip from '@/utils/clipboard' // use clipboard directly
import clipboard from '@/directive/clipboard/index.js' // use clipboard by v-directive

handleCopy(text, event) {
  clip(text, event)
},
clipboardSuccess() {
  this.$message({
    message: 'Copy successfully',
    type: 'success',
    duration: 1500
  })
}
```

## js-cookie

## 实现pdf下载 使用window.print()


## 重定向页面 redirect
### index.vue
```js
<script>
export default {
  created() {
    const { params, query } = this.$route
    const { path } = params
    this.$router.replace({ path: '/' + path, query })
  },
  render: function(h) {
    return h() // avoid warning message
  }
}
</script>
```
### route.js
```js
{
  path: '/redirect',
  component: Layout,
  hidden: true,
  children: [
    {
      path: '/redirect/:path(.*)',
      component: () => import('@/views/redirect/index')
    }
  ]
}
```