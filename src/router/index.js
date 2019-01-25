import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import explore from '../components/explore/explore.vue'
import video from '../components/video/video.vue'
import myself from '../components/myself/myself.vue'
import friend from '../components/friend/friend.vue'
import user from '../components/user/user.vue'

//export default 是对外暴露这个配置
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/explore',
      name: 'explore',
      component: explore
    },
    {
      path: '/video',
      name: 'video',
      component: video
    },
    {
      path: '/myself',
      name: 'myself',
      component: myself
    },
    {
      path: '/friend',
      name: 'friend',
      component: friend
    },
    {
      path: '/user',
      name: 'user',
      component: user
    }
  ]
})
