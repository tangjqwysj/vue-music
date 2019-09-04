import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const Recommend = () => import(/* webpackChunkName:'recommend' */ '../components/recommend/recommend.vue')
const Singer = () => import(/* webpackChunkName:'singer' */ '../components/singer/singer.vue')
const Rank = () => import(/* webpackChunkName:'rank' */ '../components/rank/rank.vue')
const Search = () => import(/* webpackChunkName:'search' */ '../components/search/search.vue')
const User = () => import(/* webpackChunkName:'user' */ '../components/user/user.vue')
const SingerDetail = () => import(/* webpackChunkName:'singer-detail' */ '../components/singet-detail/singer-detail.vue')
const Disc = () => import(/* webpackChunkName:'disc' */ '../components/disc/disc.vue')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/recommend',
      component: Recommend,
      children: [
        {
          path: ':id',
          component: Disc
        }
      ]
    },
    {
      path: '/singer',
      component: Singer,
      children: [
        {
          path: ':id',
          component: SingerDetail
        }
      ]
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/user',
      component: User
    }
  ]
})
