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
          :label="col.label"
          :width="col.width"
          :formatter="col.formatter"
          show-overflow-tooltip
          align="center"
        >
          <template slot-scope="scope">
            <template v-if="!type">
              <el-input size="mini" v-model="scope.row[col.prop]" />
            </template>
            <span v-else>{{ scope.row[col.prop] }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
  </div>
</template>
<script>
import resize from './resize'
export default {
  name: 'AkEditTable',
  mixins: [resize],
  props: {
    columns: {
      type: Array,
      required: true
    },
    type: {
      type: Boolean,
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
