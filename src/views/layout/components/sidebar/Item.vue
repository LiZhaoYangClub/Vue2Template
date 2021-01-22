<script>
import SvgIcon from '@/components/SvgIcon/index.vue'
export default {
  name: 'MenuItem',
  functional: true,
  props: {
    icon: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    opened: {
      type: Boolean,
      required: true
    }
  },
  render(h, context) {
    const { icon, title, opened } = context.props
    const vnodes = []
    if (icon) {
      const svgNode = h(SvgIcon, { props: { iconClass: icon } }, '')
      vnodes.push(svgNode)
    }
    const hide = opened ? 'hide-title' : ''
    if (title) {
      const spanNode = h(
        'span',
        {
          class: hide
        },
        title
      )
      vnodes.push(spanNode)
    }
    return h('div', { class: `item-router ${hide ? 'hide-arrow' : ''}` }, vnodes)
  }
}
</script>
