import Vue from 'vue'
import Vuex from 'vuex'
import login from './modules/login'
import types from './modules/type'
import users from './modules/users'
import movies from './modules/movie'

Vue.use(Vuex)
const state = () => ({
    overlay: false
})
const getters = {
  getOverlay: state => state.overlay
}
const mutations = {
  SET_OVERLAY: (state, value) => state.overlay = value 
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  modules: {
    login,
    types,
    users,
    movies
  }
})
