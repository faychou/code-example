import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import 'amfe-flexible'

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
