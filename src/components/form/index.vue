<template>
  <el-form ref="form" :model="formData" v-bind="$attrs">
    <template v-for="col in columns">
      <slot v-if="col.slot" :name="col.slot" :row="formData"></slot>
      <el-form-item v-else :label="col.label" :key="col.label" :prop="col.prop">
        <el-input v-if="col.type === 'input'" v-model="formData[col.prop]" />
        <el-select
          v-else-if="col.type === 'select'"
          v-model="formData[col.prop]"
          placeholder="请选择"
        >
          <el-option
            v-for="item in col.options"
            :key="item.label"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
        <el-switch
          v-else-if="col.type === 'switch'"
          v-model="formData[col.prop]"
        />
        <el-input
          v-else-if="col.type === 'textarea'"
          type="textarea"
          v-model="formData[col.prop]"
        />
        <el-radio-group
          v-else-if="col.type === 'radioGroup'"
          v-model="formData[col.prop]"
        >
          <el-radio
            v-for="item in col.options"
            :key="item.label"
            :label="item.value"
          >
            {{ item.label }}
          </el-radio>
        </el-radio-group>
        <el-checkbox-group
          v-else-if="col.type === 'check'"
          v-model="formData[col.prop]"
        >
          <el-checkbox
            v-for="item in col.options"
            :key="item.label"
            :label="item.value"
            :name="col.name"
          >
            {{ item.label }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
export default {
  name: 'AkForm',
  props: {
    columns: {
      type: Array,
      required: true
    },
    form: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    constList: ['input', 'select']
  }),
  computed: {
    formData: {
      get: function() {
        return this.form
      },
      set: function(val) {
        this.$emit('update:form', val)
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('success')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  clear() {
    this.$refs.form && this.$refs.form.resetFields()
  }
}
</script>

<style lang="scss" scoped></style>
