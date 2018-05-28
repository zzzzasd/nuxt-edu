<template>
  <div class="container">
    <h1>Attendance</h1>
      <ul>
        <li v-for="(attendee, index) in attendance.attendeeList" :key="index">
          {{ attendee }}
        </li> 
      </ul>
      <p><nuxt-link to="/attendance">Back to the Classroom list</nuxt-link></p>
  </div>
</template>

<script>

import axios from "axios";

export default {
  async asyncData({ params }) {
    // We can use async/await ES6 feature
    return axios.get(`http://localhost:8000/api/attendances/${params.id}`).then(res => {
      console.log(res.data)
      return { attendance: res.data.attendance };
    });
  },
  data() {
    return {
    };
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
ul {
  list-style-type: none;
  padding: 0;
}
ul li {
  border: 1px #ddd solid;
  padding: 20px;
  text-align: left;
}
ul li a {
  color: gray;
}
p {
  font-size: 20px;
}
a {
  color: #41b883;
}
</style>
