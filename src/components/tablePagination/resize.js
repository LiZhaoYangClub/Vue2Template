import {
  debounce
} from '@/utils'

export default {
  data: () => ({
    $_resizeHandler: null,
    height: 0
  }),
  mounted() {
    this.initListener()
    this.resize()
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
      this.$nextTick(_ => {
        const boxHeight = this.$refs.akTableBox.offsetHeight
        this.height = boxHeight - this.bottom
      })
    }
  }
}
