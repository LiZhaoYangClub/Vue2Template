<template>
  <div class="echarts"></div>
</template>
<script>
import * as echarts from 'echarts'
import resize from './resize'
export default {
  name: 'AkEcharts',
  mixins: [resize],
  props: {
    repaint: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    '$attrs.option': {
      handler(newValue) {
        this.paint()
      },
      deep: true
    }
  },
  mounted() {
    this.chart = echarts.init(this.$el)
    this.$attrs.option && this.chart.setOption(this.$attrs.option)
  },
  methods: {
    chartresize() {
      this.chart.resize()
    },
    paint() {
      if (this.repaint) {
        this.chart.dispose()
        this.chart = null
      } else {
        this.chartresize()
      }
      this.chart = echarts.init(this.$el)
      this.chart.setOption(this.$attrs.option)
    }
  }
}
</script>

<style lang="scss" scoped>
.echarts {
  width: 100%;
  height: 100%;
}
</style>
