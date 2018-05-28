

<template>
  <div class="container">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Login</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="loginForm.email"
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
        email: "",
        password: "",
      },
      error: null
    }
  },
  methods: {
    async login() {
      this.error = null
      const data = {
        user: {
          email: this.loginForm.email,
          password: this.loginForm.password,
        }
      }
      console.log({data})
      return this.$auth
        .login({ data })
        .then((res) => {
          console.log('\n\n\nSEX\n\n\n')
          console.log(res)
        })
        .catch(error => {
          this.error = error + ''
        })
    }
  }
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
