
<template>
  <div class="container">
    <h1>Select Classroom</h1>
    <ul>
      <li v-for="(classroom, index) in classrooms" :key="index">
        <nuxt-link :to="{ name: 'attendance-id', params: { id: classroom.id } }">{{ classroom.class_name }}</nuxt-link>
        <button @click="deleteButton(index, classroom.id)">Remove</button>
      </li>
    </ul>
    <input v-model="class_name"/>
    <button @click="onSubmit">Submit</button>
    <p><nuxt-link to="/">Back to home page</nuxt-link></p>
    
  </div>
</template>

<script>
import axios from "axios";

export default {
  asyncData({ req, params }) {
    // We can return a Promise instead of calling the callback
    return axios.get("http://localhost:8000/classrooms/").then(res => {
      return { classrooms: res.data};
    });
  },
  data () {
    return {
      class_name:'',
      id:'',
      students:''
    }
  },
  head: {
    title: "List of classrooms"
  },
  methods: {
    deleteButton(index, id) {
      axios.delete(`http://localhost:8000/classrooms/${id}`)
      .then(response => this.classrooms.splice(index,1))
      .catch(function (error) {
        console.log(error.response);
      });
    },
    onSubmit() {
      let vue = this
      axios.post("http://localhost:8000/classrooms/", {
        class_name: this.class_name,
        students:[],
      }).then(function (response) {
        vue.subjects.push(response.data)
        console.log(response);
      })
      .catch(function (error) {
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
