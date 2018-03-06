import Vue from 'vue'
import Vuex from 'vuex'

import concert from './concert'
import user from './user'
import shared from './shared'

Vue.use(Vuex)
export const store = new Vuex.Store({
  modules: {
    concert: concert,
    user: user,
    shared: shared
  }
})
