<template>
  <div class="ak-table" ref="akTableBox">
    <el-table
      v-bind="$attrs"
      v-on="$listeners"
      :height="height"
      tooltip-effect="dark"
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
    <div :class="{ hidden: hidden }" class="pagination-container">
      <el-pagination
        :background="background"
        :current-page.sync="currentPage"
        :page-size.sync="pageSize"
        :layout="layout"
        :page-sizes="pageSizes"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
        <div class="my-total">
          共 {{ total }} 条记录 &nbsp;&nbsp;&nbsp;&nbsp;第{{ page }} /
          {{ Math.ceil(total / limit) }} 页
        </div>
      </el-pagination>
    </div>
  </div>
</template>

<script>
import resize from './resize'

export default {
  name: 'AkTablePagination',
  mixins: [resize],
  props: {
    total: {
      required: true,
      type: Number
    },
    page: {
      type: Number,
      default: 1
    },
    bottom: {
      type: Number,
      default: 32
    },
    limit: {
      type: Number,
      default: 20
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50]
      }
    },
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next'
    },
    background: {
      type: Boolean,
      default: true
    },
    autoScroll: {
      type: Boolean,
      default: true
    },
    hidden: {
      type: Boolean,
      default: false
    },
    columns: {
      type: Array,
      required: true
    }
  },
  computed: {
    currentPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('update:page', val)
      }
    },
    pageSize: {
      get() {
        return this.limit
      },
      set(val) {
        this.$emit('update:limit', val)
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.$emit('pagination', { page: this.currentPage, limit: val })
    },
    handleCurrentChange(val) {
      this.$emit('pagination', { page: val, limit: this.pageSize })
    }
  }
}
</script>

<style lang="scss" scoped>
.ak-table {
  width: 100%;
  height: 100%;
}
</style>
