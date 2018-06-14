<template>
  <div class="container">
    <v-card>
      <v-toolbar color="primary" dark>
        <v-toolbar-title>Sign Up</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-text-field
            v-model="signUpForm.username"
            prepend-icon="person"
            name="signup"
            label="SignUp"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="signUpForm.password"
            prepend-icon="lock"
            name="password"
            label="Password"
            id="password"
            type="password"
          ></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="primary"
          @click="signUp">Sign Up</v-btn>
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
      signUpForm: {
        username: "",
        password: "",
      },
      error: null
    }
  },
  methods: {
    async signUp() {
      this.error = null
      const data = {
        username: this.signUpForm.username,
        password: this.signUpForm.password
      }
      console.log(data)
      return this.$store.dispatch('users/REGISTER', data)
        .then(res => {
          this.$router.replace('/')
        })
        .catch(err => {
          error({ statusCode: 400, message: 'asdasd' })
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
