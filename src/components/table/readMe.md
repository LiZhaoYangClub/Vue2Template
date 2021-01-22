```html
  <ak-table :data="tableData" :columns="columns">
    <el-table-column
      slot="test"
      label="配置同步状态"
      align="center"
      width="200"
    >
      <template slot-scope="scope">
        <el-button type="primary"
          >{{ scope.row.text || 'test' }} {{ scope.$index }}</el-button
        >
      </template>
    </el-table-column>
  </ak-table>
```


```js
columns: [
  {
    prop: '', // 数据对应的字段名
    type: '', // 默认不传、当需要index\select 时可传
    label: '', // 显示的表头信息
    width: '', // 默认均分
    formatter: (row) => {
      return row.status === 1 ? '成功' : '失败'
    }, // 当前值需处理的情况下使用， 默认不使用
    sortable: true, // 默认不排序
    slot: 'test', // slot 
  }
]

// data: { page, limit }
```