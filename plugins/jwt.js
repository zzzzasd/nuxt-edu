const ID_TOKEN_KEY = 'EDUPLUS'

export default {
  getToken () {
    if (process.SERVER)
    return window.localStorage.getItem(ID_TOKEN_KEY)
  },

  saveToken (token) {
    if (process.SERVER)
    return window.localStorage.setItem(ID_TOKEN_KEY, token)
  },

  destroyToken () {
    if (process.SERVER) 
    return window.localStorage.removeItem(ID_TOKEN_KEY)
  }
}