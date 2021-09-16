import Vue from 'vue'
import App from './App.vue'
import router from "@/router/router";
import store from '@/store/store'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')


/* 
Vanha main, router siirtynyt router kansioon, voi varmaan poistaa
import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import Store from './store/store'

Vue.use(VueRouter)

//Views 
import Start from "./components/Start/Start.vue";
import Questions from "./components/Questions/Questions.vue";
import Result from "./components/Result/Result.vue";

Vue.config.productionTip = false

const routes = [
  { path: '/', component: Start },
  { path: '/start', component: Start },
  { path: '/questions', component: Questions },
  { path: '/result', component: Result },
]

new Vue({
  render: h => h(App),
  router: new VueRouter({ routes }),
  store: Store,
}).$mount('#app')
 */