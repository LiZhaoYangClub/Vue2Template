## 编辑状态下 会更改data数据 (建议先备份data)
```html
<edit-table :data="tableData" :columns="columns" :type="disabled">
```

+ disabled: false // 是否禁用
+ tableData: [] // 表格数据
+ columns: [] // 表头数据