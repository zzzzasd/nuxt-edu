
<template>
<v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1>Student Database </h1>
        <table id="firstTable">
          <thead>
            <tr>
              <th>No.</th>
              <th>Username</th>
              <th>Name</th>
              <th>Present</th>
              <th>Absent</th>
              <th>Total</th>
              
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user,index) in users.users" :key="index">
              <td>{{user.id}}</td>
              <td>{{user.username}}</td>
              <td>{{user.full_name}}</td>
              <td>{{user.phone_number}}</td>
              <td>{{user.present_total}}</td>
              <td>{{user.absent_total}}</td>
              <td>{{ user.present_total}}/{{ user.present_total + user.absent_total }} </td>                       -->
            </tr>
          </tbody>
        </table>
        
  <!-- <v-data-table>
    <template slot="user">
      <td class="text-xs-right">{{ user.id }}</td>
      <td class="text-xs-right">{{ user.username }}</td>
      <td class="text-xs-right">{{ user.full_name }}</td>
      <td class="text-xs-right">{{ user.phone_number }}</td>
      <td class="text-xs-right">{{ user.present_total }}</td>
      <td class="text-xs-right">{{ user.absent_total }}</td>            
    </template>
  </v-data-table> -->

<h1><nuxt-link to="/">Back to home page</nuxt-link></h1>

</v-flex>
</v-layout>
</template>

<script>
import axios from "axios";

export default {
  asyncData({ req, params }) {
    // We can return a Promise instead of calling the callback
    return axios.get("http://localhost:8000/api/users/all/").then(res => {
      return { users: res.data };
    });
  },
  data() {
    return {
      users: "",
      name: "",
      phone_number: "",
      present_total: "",
      absent_total: "",
    };
  },
  computed: {
    total() {
      return present_total + absent_total
    }
  }
}
</script>

<style scoped>
</style>
