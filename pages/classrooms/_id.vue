<template>
  <div class="container">
    <h1>Class {{classroom.name}}</h1>
        <div v-for="(student, index) in classroom.students" :key="index">
          <input type="checkbox" v-model="selected" :value="student.username"  />
          <label>{{ student.full_name }} </label>
        </div>
      <p> {{ selected }} </p>
      <v-btn color="success" @click="markPresent">Present</v-btn>      
      <v-btn color="error" @click="markAbsent">Absent</v-btn>
      <p><nuxt-link to="/classrooms">Back to Classroom Page</nuxt-link></p>

  </div>
</template>

<script>
import axios from "axios";

export default {
  async asyncData({ params }) {
    // We can use async/await ES6 feature
    return axios.get(`http://localhost:8000/api/classrooms/${params.id}`).then(res => {
      console.log(res.data)
      return { classroom: res.data.classroom };
    });
  },
  data () {
    return {
      // classroom:null
      selected:[]
    }
  },
  head: {
    title: "List of classrooms"
  },
  methods: {
    markPresent() {
      let vue = this;
      axios
        .post("http://localhost:8000/api/attendances", {
          attendees: this.selected,
          classroom: this.classroom.id,
          status: "1",
        })
        .then(function(response) {
          vue.users.push(response.data.users);
          console.log(response);
        })
        .catch(function(error) {
          console.log(error.response);
        });
    },
    markAbsent() {
      let vue = this;
      axios
        .post("http://localhost:8000/api/attendances", {
          attendees: this.selected,
          classroom: this.classroom.id,
          status: "0",
        })
        .then(function(response) {
          vue.users.push(response.data.users);
        })
        .then(axios({
            method : 'post',
            url : 'https://rest.nexmo.com/sms/json',
            params:{
              api_key:'ae978186',
              api_secret:'G9zzAXCV5YLh2ylV',
              to:60102322695,
              from:'NEXMO',
              text:"Your child is absent"
            },
            headers:{
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }))
        .catch(function(error) {
          console.log(error.response);
        })
    // deleteButton(index, id) {
    //   axios.delete(`http://localhost:8000/classrooms/${id}`)
    //   .then(response => this.classrooms.splice(index,1))
    //   .catch(function (error) {
    //     console.log(error.response);
    //   });
    // },
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
