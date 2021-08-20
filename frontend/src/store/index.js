import { createStore } from 'vuex'

export default createStore({
  state: {
    user: JSON.parse(window.localStorage.getItem("user")) || {},
    isMobile: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
      window.localStorage.setItem("user", JSON.stringify(payload));
    },
    logout(state) {
      state.user = {};
      window.localStorage.setItem("user", "{}");
    },
    runningMobile(state) {
      state.isMobile = true;
    }
  },
  actions: {
  },
  modules: {
  }
})
