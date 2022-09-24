import { createStore } from "vuex";

export default createStore({
  state: {
    isLoggedIn: false,
    userChanged: false,
    offline: false,
  },
  getters: {},
  mutations: {
    signIn (state) {
      state.isLoggedIn = true
    },
    signOut (state) {
      state.isLoggedIn = false
    },
    userChanged (state) {
      state.userChanged = true
    },
    offline (state, status) {
      state.offline = status
    },
    userUpdated (state) {
      state.userChanged = false
    }
  },
  actions: {},
  modules: {},
});
