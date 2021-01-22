<template>
  <div class="w-100 h-100 overflow-hidden layout position-relative">
    <div class="head"><Head /></div>
    <div
      class="main position-relative"
      :style="`padding-left: ${iconClass === 'close' ? '220px' : '64px'};`"
    >
      <div
        class="menu h-100 overflow-hidden"
        :style="`width: ${iconClass === 'close' ? '220px' : '64px'};`"
      >
        <div class="ctrl cursor-pointer">
          <SvgIcon :icon-class="iconClass" @click="handleExpand" />
        </div>
        <Menu />
      </div>
      <div class="article h-100 overflow-hidden position-relative">
        <!-- transition  会影响position: fixed; 定位相关Bug -->
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="cachedViews">
            <router-view :key="key" />
          </keep-alive>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import Head from './components/header/index.vue'
import Menu from './components/sidebar/index.vue'
import { mapState } from 'vuex'

export default {
  name: 'Layout',
  components: {
    Head,
    Menu
  },
  data: () => ({

  }),
  computed: {
    ...mapState({
      opened: state => state.app.menu.opened,
      cachedViews: state => state.app.cachedViews
    }),
    iconClass() {
      return this.opened ? 'open' : 'close'
    },
    key() {
      return this.$route.path
    }
  },
  methods: {
    handleExpand() {
      this.$store.dispatch('app/expand')
    }
  }
}
</script>

<style lang="scss" scoped>
.layout {
  .head {
    height: 60px;
  }
  .main {
    height: calc(100% - 60px);
    // transition: all 0.3s ease-in-out;
  }
  .menu {
    // transition: all 0.3s ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
    ::v-deep.el-scrollbar{
      height: 100%;
    }
    .ctrl {
      position: absolute;
      bottom: 10px;
      left: 0;
      width: 100%;
      background: transparent;
      z-index: 2;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
