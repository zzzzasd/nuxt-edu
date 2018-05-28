module.exports = {
  loading: {
    color: '#4FC08D',
    failedColor: '#bf5050',
    duration: 1500
  },
  head: {
    title: 'nuxt-edu',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    '@nuxtjs/proxy',

  ],

  axios: {
    baseURL: 'http://localhost:3000/api',
    proxy: true,
    credentials: true,
    debug: true,
    prefix: '/api'
  },

  proxy: {
    '/api': { target: 'http://localhost:8000/' }
  },
  auth: {
    fetchUserOnLogin : false,
    redirect: {
      login: '/attendances',
      // logout: '/',
      // callback: '/login',
      // user: '/'
    },

    strategies: {
      local: {
        endpoints: {
          login: { url: '/users/login/', method: 'post', propertyName: 'data' },
          logout: { url: '/auth/logout', method: 'post' },
          user: { url: '/user/me', method: 'get', propertyName: 'user' }
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
      }
    }
  },
  plugins: [
    { src: '~/plugins/vuetify' }
  ]
}
