<template>
  <div class="container">
    <h1>List of Students</h1>
      <ul>
        <li v-for="(student,index) in classroom.students" :key="index">
          {{ student.name }}
        </li> 
      </ul>
      <input v-model="name"/>
      <p><nuxt-link to="/attendance">Back to the Classroom list</nuxt-link></p>
  </div>
</template>

<script>

import axios from "axios";

export default {
  async asyncData({ params }) {
    // We can return a Promise instead of calling the callback
    const { data } = await axios.get (
      `http://localhost:8000/classrooms/${params.id}`
    );
    return {classroom: data}
  },
  data() {
    return {
      student: '',
      name:'',
      classrooms: '',
      class_name: ''
    };
  },
  methods: {
    onSubmit() {
      const newStudents = [...this.student, {name: this.name}];
      axios
        .patch(`http://localhost:8000/classrooms/${this.$route.params.id}/`, {
          students: newStudents
        })
        .then(response => {
          this.classroom = response.data
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
