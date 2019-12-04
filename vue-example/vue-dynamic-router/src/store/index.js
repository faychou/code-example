import Vue from "vue";
import Vuex from "vuex";
import router from "../router"

Vue.use(Vuex);

// 管理员数据
const adminStore = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
}

// 用户数据
const userStore = {
  state: {},
  getters: {},
  mutations: {},
  actions: {},
}

export default new Vuex.Store({
  state: {
    isLoading: false,
    username: window.sessionStorage.getItem("username"),
    token: window.sessionStorage.getItem("username")
  },
  mutations: {
    changeLoading(state) {
      state.isLoading = !state.isLoading
    },
    setUsername(state, value) {
      state.username = value
    },
    setToken(state, value) {
      state.token = value
    }
  },
  actions: {
    changeLoadingSync({ commit }) {
      commit("changeLoading")
    },
    LoginSync({ commit }, username) {
      commit("setUsername", username)
      commit("setToken", "token")
      window.sessionStorage.setItem("username", "user")
      window.sessionStorage.setItem("token", "token")

      var path = router.history.current.query.redirect || "/home"
      router.push(path)
    },
    logout({ commit }) {
      commit("setUsername", "")
      commit("setToken", "")
      window.sessionStorage.removeItem("username")
      window.sessionStorage.removeItem("token")
      router.push("/login")
    }
  },
  modules: {
    adminStore,
    userStore
  }
});
