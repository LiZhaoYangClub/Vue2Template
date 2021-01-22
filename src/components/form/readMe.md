```html
  <ak-form
    :columns="columnsForm"
    :form="form"
    label-width="80px"
    :rules="rules"
    align="right"
    @success="successCb"
  >
    <template v-slot:slotTemp="slotProps">
      <el-form-item label="配置同步状态">
        <el-button type="primary">{{
          slotProps.text || 'tee'
        }}</el-button>
      </el-form-item>
    </template>
  </ak-form>
```

```js
import rules from '@/utils/rules'
export default {
  data: () => ({
    rules,
    form: {
      ssss: 'test',
      cccc: '1',
      aaa: false,
      desc: '11',
      radio: '1',
      check: ['1']
    },
    columns: [
      // input输入框
      {
        label: 'input',
        prop: 'ssss',
        type: 'input'
      },
      // 单选框
      {
        label: 'select',
        prop: 'cccc',
        type: 'select',
        options: [
          {
            label: '1',
            value: '1'
          },
          {
            label: '2',
            value: '2'
          }
        ]
      },
      // 开关
      {
        label: 'switch',
        prop: 'aaa',
        type: 'switch'
      },
      // input 文本域
      {
        label: 'desc',
        prop: 'desc',
        type: 'textarea'
      },
      // 单选组
      {
        label: 'radioGroup',
        prop: 'radio',
        type: 'radioGroup',
        options: [
          {
            label: '1',
            value: '1'
          },
          {
            label: '2',
            value: '2'
          }
        ]
      },
      // 多选框
      {
        label: 'check',
        prop: 'check',
        type: 'check',
        options: [
          {
            label: 'a',
            value: '1'
          },
          {
            label: 'b',
            value: '2'
          }
        ]
      },
      {
        slot: 'slotTemp'
      }
    ]
  }),
  methods: {
    // 提交form
    handleSubmit() {
      this.$refs.akForm && this.$refs.akForm.submit()
    },
    // 提交form成功回调
    successCb() {
      console.log('success')
    },
    // 重置表单
    clearForm () {
      this.$refs.akForm && this.$refs.akForm.clear()
    }
  }
}

```