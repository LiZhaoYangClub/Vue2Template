import LoadMore from './loadMore'

const loadMore = {
  install: (Vue) => {
    Vue.directive('loadmore', LoadMore)
  }
}
export default loadMore
