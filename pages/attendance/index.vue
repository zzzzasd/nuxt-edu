
<template>
  <div class="container">
    <h1>Select Attendance</h1>
    <h2> {{ attendances }} </h2>
      <p>Total Attendances: {{ attendancesCount }}</p>
      <p><nuxt-link to="/">Back to home page</nuxt-link></p>
</div>
</template>

<script>
import axios from "axios";

export default {
  asyncData({ req, params }) {
    // We can return a Promise instead of calling the callback
    return axios.get("http://localhost:8000/api/attendances").then(res => {
      console.log(res.data)
      return {
        attendances: res.data.attendances,
        attendancesCount: res.data.attendancesCount
      };
    });
  },
  data () {
    return {
      // attendances: [],
      // attendanceList:[]
    }
  },
  head: {
    title: "List of attendances"
  },
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
