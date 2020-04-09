import Vue from 'vue'
import Vuex from 'vuex'
import read from './modules/read'
import bookmall from './modules/bookmall'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    read,
    bookmall
  }
})
