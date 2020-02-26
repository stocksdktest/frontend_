import Vue from 'vue'
import Router from 'vue-router'
import App from './App'
import routes from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import echarts from 'echarts'
import VueResource from 'vue-resource'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.prototype.$echarts = echarts
Vue.prototype.$axios = axios
//Vue.use(VueAxios,axios);
Vue.use(Router)
Vue.use(ElementUI)
Vue.use(VueResource)
const router = new Router({
  routes
});

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
