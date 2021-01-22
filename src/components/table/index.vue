<template>
  <div class="ak-table" ref="akTableBox">
    <el-table
      v-bind="$attrs"
      v-on="$listeners"
      tooltip-effect="dark"
      :height="height"
    >
      <template v-for="(col, index) in columns">
        <!-- 操作列/自定义列 -->
        <slot v-if="col.slot" :name="col.slot"></slot>
        <!-- 普通列 -->
        <el-table-column
          v-else
          :key="index"
          :prop="col.prop"
          :type="col.type"
          :label="col.label"
          :width="col.width"
          :formatter="col.formatter"
          :sortable="col.sortable"
          show-overflow-tooltip
          align="center"
        >
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>

<script>
import resize from './resize'

export default {
  name: 'AkTable',
  mixins: [resize],
  props: {
    columns: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    height: 0
  })
}
</script>

<style lang="scss" scoped>
.ak-table {
  width: 100%;
  height: 100%;
}
</style>
