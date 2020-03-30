import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './language'
import './assets/styles/icon.css' // 引入字体图标
import './assets/styles/global.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
