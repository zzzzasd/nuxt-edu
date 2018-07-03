
<template>
<v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1>Profile Page</h1>
        <h1> {{user.user.full_name }} </h1>
        <h1> {{user.user.phone_number }} </h1>
        <h1> {{user.user.present_total }} </h1>
        <h1> {{user.user.absent_total}} </h1>
        
<h1><nuxt-link to="/">Back to home page</nuxt-link></h1>

</v-flex>
</v-layout>
</template>

<script>
import axios from "axios";

export default {
  asyncData({ req, params, store }) {
    // We can return a Promise instead of calling the callback
    console.log(store.state.users.accessToken)
    return axios.get("http://localhost:8000/api/user", { 
      headers: {
        "Authorization": `Token ${store.state.users.accessToken}`
      }
    }).then(res => {
      return { user: res.data };
    });
  },
  data() {
    return {
      user: "",

    };
  },
  methods: {
  }
};
</script>

<style scoped>
</style>
