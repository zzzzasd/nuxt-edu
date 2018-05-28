import Cookie from 'js-cookie'

export const state = () => ({
  errors: null,
  accessToken: null,
  user: {},
  isAuthenticated: !!Cookie.get('auth')
})

export const getters = {
  currentUser (state) {
    return state.user
  },
  isAuthenticated (state) {
    return state.isAuthenticated
  }
}

export const actions = {
  'LOGIN' (context, credentials) {
    return new Promise((resolve) => {
      this.$axios
        .$post('users/login/', { user: credentials })
        .then((res) => {
          context.commit('SET_AUTH', res.user)
          resolve(res)
        })
        .catch((err) => {
          context.commit('SET_ERROR', err)
        }) 
    })
  },
  'LOGOUT' (context) {
    context.commit('PURGE_AUTH')
  },
  'REGISTER' (context, credentials) {
    return new Promise((resolve, reject) => {
      this.$axios
        .post('users', {user: credentials})
        .then(({data}) => {
          context.commit(SET_AUTH, data.user)
          resolve(data)
        })
        .catch(({response}) => {
          context.commit(SET_ERROR, response.data.errors)
        })
    })
  },
  'CHECK_AUTH' (context) {
    if (JwtService.getToken()) {
      ApiService.setHeader()
      ApiService
        .get('user')
        .then(({data}) => {
          context.commit(SET_AUTH, data.user)
        })
        .catch(({response}) => {
          context.commit(SET_ERROR, response.data.errors)
        })
    } else {
      context.commit(PURGE_AUTH)
    }
  },
  'UPDATE_USER' (context, payload) {
    const {email, username, password, image, bio} = payload
    const user = {
      email,
      username,
      bio,
      image
    }
    if (password) {
      user.password = password
    }

    return this.$axios
      .put('user', user)
      .then(({data}) => {
        context.commit(SET_AUTH, data.user)
        return data
      })
  }
}

export const mutations = {
  SET_ERROR (state, error) {
    state.errors = error
  },
  SET_TOKEN (state, token) {
    state.accessToken = token
    state.isAuthenticated = true
  },
  SET_AUTH (state, user) {
    state.isAuthenticated = true
    state.user = user
    state.errors = {}
    Cookie.set('auth', user.token) // saving token in cookie for server rendering

  },
  PURGE_AUTH (state) {
    state.isAuthenticated = false
    state.user = {}
    state.errors = {}
    Cookie.remove('auth')
  }
}