import AuthService from '../../services/auth.service'

const user = localStorage.getItem('token')
const initialState = user
  ? { status: { loggedIn: true }, user }
  : { status: { loggedIn: false }, user: null }

const state = initialState

const mutations = {
  loginSuccess(state, user) {
    state.status.loggedIn = true
    state.user = user
  },
  loginFailure(state) {
    state.status.loggedIn = false
    state.user = null
  },
  logout(state) {
    state.status.loggedIn = false
    state.user = null
  },
  registerSuccess(state) {
    state.status.loggedIn = false
  },
  registerFailure(state) {
    state.status.loggedIn = false
  }
}

const actions = {
  login({ commit }, user) {
    return AuthService.login(user).then(
      user => {
        commit('loginSuccess', user)
        return Promise.resolve(user)
      },
      error => {
        commit('loginFailure')
        return Promise.reject(error)
      }
    )
  },
  logout({ commit }) {
    AuthService.logout()
    commit('logout')
  },
  register({ commit }, user) {
    return AuthService.register(user).then(
      response => {
        commit('registerSuccess')
        return Promise.resolve(response.data)
      },
      error => {
        commit('registerFailure')
        return Promise.reject(error)
      }
    )
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
