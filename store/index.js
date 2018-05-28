const cookieparser = require('cookieparser')

export const state = () => ({
  sidebar: false
})
  
export const mutations = {
  toggleSidebar (state) {
    state.sidebar = !state.sidebar
  }
}

export const actions = {
  nuxtServerInit ({ commit }, { req }) {
    console.log('Nuxt starting server')
    let accessToken = null
    if (req.headers.cookie) {
      var parsed = cookieparser.parse(req.headers.cookie)
      accessToken = parsed.auth
    }
    commit('users/SET_TOKEN', accessToken)
  },
}