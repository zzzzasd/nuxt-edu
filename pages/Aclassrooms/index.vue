
<template>
  <div class="container">
    <h1>Select Classroom</h1>
      <ul>
        <li v-for="(classrooms, index) in classrooms.classrooms" :key="index">
          <nuxt-link :to="{ name: 'classrooms-id', params: { id: classrooms.id } }">{{ classrooms.name }}</nuxt-link>
        </li>
      </ul>
      <input v-model="name"/>
      <p><nuxt-link to="/">Back to home page</nuxt-link></p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  asyncData({ req, params }) {
    // We can return a Promise instead of calling the callback
    return axios.get("http://localhost:8000/api/classrooms").then(res => {
      console.log(res.data)
      return { classrooms: res.data};
    });
  },
  data () {
    return {
      classrooms:null
    }
  },
  head: {
    title: "List of classrooms"
  },
  methods: {
    onSubmit() {
      const classroomList = [...this.classrooms, { name: this.name }];
      axios
        .patch(`http://localhost:8000/api/classrooms/`, {
          classrooms: classroomList
        })
        .then(response => {
          this.classrooms = response.data
        })
        .catch(function(error) {
          console.log(error.response);
        });
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
