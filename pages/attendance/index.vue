
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
            <tr v-for="(profile,index) in profiles.profiles" :key="index">
              <td>{{profile.id}}</td>
              <td>{{profile.username}}</td>
              <td>{{profile.full_name}}</td>
              <td>{{profile.phone_number}}</td>
              <td>{{profile.present_total}}</td>
              <td>{{profile.absent_total}}</td>
              <td>{{ profile.present_total}}/{{ profile.present_total + profile.absent_total }} </td>                      
            </tr>
          </tbody>
        </table>
        
  <!-- <v-data-table>
    <template slot="profile">
      <td class="text-xs-right">{{ profile.id }}</td>
      <td class="text-xs-right">{{ profile.username }}</td>
      <td class="text-xs-right">{{ profile.full_name }}</td>
      <td class="text-xs-right">{{ profile.phone_number }}</td>
      <td class="text-xs-right">{{ profile.present_total }}</td>
      <td class="text-xs-right">{{ profile.absent_total }}</td>            
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
    return axios.get("http://localhost:8000/api/profiles/all/").then(res => {
      return { profiles: res.data };
    });
  },
  data() {
    return {
      profiles: "",
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
