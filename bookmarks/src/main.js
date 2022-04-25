import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/index.less'
import './styles/iconfont.css'
import message from '@/components/message'
import directives from '@/directives'

Vue.config.productionTip = false
Vue.use(message)
Vue.use(directives)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
