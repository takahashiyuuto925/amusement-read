import Vue from 'vue'
import Vuex from 'vuex'
import read from './modules/read'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    read
  }
})
