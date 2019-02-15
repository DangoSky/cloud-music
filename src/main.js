import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import VueLazyLoad from 'vue-lazyload'
import store from './store'

Vue.use(VueLazyLoad, {
  preload: 1
})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router: router,
  store
}).$mount('#app')



