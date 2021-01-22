```html
  <ak-table-pagination
    :data="tableData"
    :columns="columns"
    v-show="total>0"
    :total="total"
    :page.sync="listQuery.page"
    :limit.sync="listQuery.limit"
    @pagination="getList"
    :bottom="bottom"
  >
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
  </ak-table-pagination>
```

```js
  bottom // 底部分页高度 默认32px
```