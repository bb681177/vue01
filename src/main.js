// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
// 第一步 import引入路由组件
import goods from './components/goods/goods'
import ratings from './components/ratings/ratings'
import seller from './components/seller/seller'

Vue.use(VueRouter)
Vue.use(VueResource)
/* eslint-disable no-new */

// 第二步 然后定义路由(routes)，components还可以是Vue.extend()创建的
const routes = [
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
  { path: '/seller', component: seller }
]

// 第三步 接着创建路由实例
const router = new VueRouter({
  linkActiveClass: 'active',
  routes // ES6缩写语法，相当于routes:routes
})
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
