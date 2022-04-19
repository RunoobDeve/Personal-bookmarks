import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import menu from './modules/menu.js'
export default new Vuex.Store({
  modules:{
    menu
  }
})
