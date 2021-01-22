import {
  debounce
} from '@/utils'

export default {
  data: () => ({
    $_resizeHandler: null,
    height: 0,
    flag: false,
    timer: null
  }),
  mounted() {
    this.initListener()
  },
  activated() {
    if (!this.$_resizeHandler) {
      this.initListener()
    }
    this.resize()
  },
  beforeDestroy() {
    this.destroyListener()
  },
  deactivated() {
    this.destroyListener()
  },
  methods: {
    initListener() {
      this.$_resizeHandler = debounce(() => {
        this.resize()
      }, 100)
      window.addEventListener('resize', this.$_resizeHandler)
    },
    destroyListener() {
      window.removeEventListener('resize', this.$_resizeHandler)
      this.$_resizeHandler = null
    },
    resize() {
      this.timer && clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.flag = true
        if (this.flag) {
          this.paint()
          this.flag = false
        }
      }, 500)
    }
  }
}
