

<template>
  <div class="container">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Login</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-alert v-if="alert" :type="alert.type" value="true">This is alert</v-alert>
        <v-form>
          <v-text-field
            v-model="loginForm.username"
            prepend-icon="person"
            name="login"
            label="Login"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="loginForm.password"
            prepend-icon="lock"
            name="password"
            label="Password"
            id="password"
            type="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          flat
          nuxt
          to="/register"
          color="primary">Sign up</v-btn>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="login">Login</v-btn>
      </v-card-actions>
    </v-card>
    <p><nuxt-link to="/subjects">Subject Page</nuxt-link></p>
    <p><nuxt-link to="/classroom">Classroom Page</nuxt-link></p>
    <p><nuxt-link to="/students">Student Page</nuxt-link></p>
    
  </div>
</template>

<script>
import qs from 'qs'

export default {
  data () {
    return {
      loginForm: {
        username: "",
        password: "",
        alert:null
      },
      error: null
    }
  },
  methods: {
    async login() {
      this.alert = null
      this.error = null
      const data = {
        username: this.loginForm.username,
        password: this.loginForm.password
      }
      return this.$store.dispatch('users/LOGIN', data)
        .then(res => {
          console.log("hello")
          this.$router.replace('/')
        })
        .catch(err => {
          console.error('adsaas', err)
        })
    }
  },
  //middleware: "authenticated"
}
</script>

<style scoped>
.container {
  width: 70%;
  margin: auto;
  text-align: center;
  padding-top: 100px;
}
p {
  font-size: 20px;
}
a {
  color: #41b883;
}
</style>
