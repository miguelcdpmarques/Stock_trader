import Vue from 'vue'
import VueRouter from 'vue-router'
import numeral from 'numeral'
import App from './App.vue'
import { routes } from './routes.js'
import { store } from './store/store.js'

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'history',
})

Vue.filter('formatNumber', function(value) {
  return numeral(value).format("0,0");
})

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
