
<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <h1>Register Student</h1>
        <v-form v-model="valid">
          <v-text-field
            label="Username"
            v-model="name"
          ></v-text-field>
          <v-text-field
            label="E-mail"
            v-model="username"
          ></v-text-field>
          <v-text-field
            label="Password"
            v-model="password"
          ></v-text-field>
        </v-form>
        <v-card-actions>
          <v-btn flat color="green" @click="onSubmit">Submit</v-btn>
        </v-card-actions>
      </v-card>

      <table id="firstTable">
        <thead>
          <tr>
            <th>No.</th>
            <th>Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(users,index) in users" :key="index">
            <td>{{users.id}}</td>
            <td>{{users.username}}</td>
            <td>{{users.email}}</td>
            <button @click="deleteRow(index,users.id)">Delete</button>
          </tr>
        </tbody>
      </table>
    
    </v-flex>
  </v-layout>
</template>

<script>
import axios from "axios";

export default {
  asyncData({ req, params }) {
    // We can return a Promise instead of calling the callback
    return axios.get("http://localhost:8000/api/users/all").then(res => {
      return { users: res.data.users };
    });
  },
  data() {
    return {
    };
  },
  methods: {
    onSubmit() {
      let vue = this;
      axios
        .post("http://localhost:8000/api/users/", {
          username: this.users.username,
          username: this.users.username,
          password: this.users.password
        })
        .then(function(response) {
          vue.users.push(response.data.users);
          console.log(response);
        })
        .catch(function(error) {
          console.log(error.response);
        });
    }
  }
};
</script>

<style scoped>
</style>
