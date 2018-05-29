<template>
  <div class="container">
    <h1>Class {{classroom.name}}</h1>
        <div v-for="(student, index) in classroom.students" :key="index">
          <input type="checkbox" v-model="selected" :value="student.id"  />
          <label>{{ student.username }} </label>
        </div>
      <p> {{ selected }} </p>
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
    // deleteButton(index, id) {
    //   axios.delete(`http://localhost:8000/classrooms/${id}`)
    //   .then(response => this.classrooms.splice(index,1))
    //   .catch(function (error) {
    //     console.log(error.response);
    //   });
    // },

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
