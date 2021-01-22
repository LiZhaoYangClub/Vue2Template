<template>
  <div class="h-100">
    <div class="scrollbar-wrapper">
      <el-menu
        class="h-100"
        :default-active="activeMenu"
        :collapse="opened"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permissionRoutes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </div>
  </div>
</template>

<script>
import SidebarItem from './SidebarItem.vue'
import { mapState } from 'vuex'
const variables = require('../../../../styles/variables.scss')

export default {
  name: 'Menu',
  components: { SidebarItem },
  data: () => ({
    variables
  }),
  computed: {
    ...mapState({
      opened: state => state.app.menu.opened,
      permissionRoutes: state => state.app.permissionRoutes
    }),
    activeMenu() {
      return this.$route.path
    }
  }
}
</script>
