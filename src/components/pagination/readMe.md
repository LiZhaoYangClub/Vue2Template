<!-- 分页 -->

```html
  <ak-pagination v-show="total>0" :total="total" :page.sync="listQuery.page" :limit.sync="listQuery.limit" @pagination="getList" />
```


```js
getList(data)

// data: { page, limit }
```