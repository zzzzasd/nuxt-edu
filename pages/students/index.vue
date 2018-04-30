
<template>
<v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1>Student Database</h1>
      
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="Identity Number"
          v-model="identity_number"
          required
        ></v-text-field>
        <v-text-field
          label="Phone Number"
          v-model="phone_number"
          required
        ></v-text-field>
      <v-btn color="success" @click="onSubmit">Add Student</v-btn>
    </v-form>


    <v-data-table
      :headers="headers"
      :users="users"
      hide-actions
      class="elevation-1"
    >
      <template slot="users" slot-scope="props">
        <td>{{ props.student }}</td>
        <td class="text-xs-right">{{ props.user.identity_name }}</td>
        <td class="text-xs-right">{{ props.user.phone_number }}</td>
      </template>
    </v-data-table>


    <table id="firstTable">
  <thead>
    <tr>
      <th>No.</th>
      <th>Name</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(user,index) in users" :key="index">
      <td>{{user.id}}</td>
      <td>{{user.name}}</td>
      <td>{{user.phone_number}}</td>
      <button @click="deleteRow(index,user.id)">Delete</button>

    </tr>
  </tbody>
</table>
<h1><nuxt-link to="/">Back to home page</nuxt-link></h1>

</v-flex>
</v-layout>
</template>

<script>
import axios from "axios";

export default {
  asyncData({ req, params }) {
    // We can return a Promise instead of calling the callback
    return axios.get("http://localhost:8000/users/").then(res => {
      return { users: res.data };
    });
  },
  data() {
    return {
      users: "",
      identity_number: "",
      email: "",
    };
  },
  methods: {
    deleteRow(index, studentID) {
      axios
        .delete(`http://localhoost:8000/users/${studentID}`)
        .then(response => this.users.splice(index, 1))
        .catch(function(error) {
          console.log(error.response);
        });
    },
    onSubmit() {
      let vue = this;
      axios
        .post("http://localhost:8000/users/", {
          name: this.identity_number,
          email: this.email,
        })
        .then(function(response) {
          vue.subjects.push(response.data);
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
