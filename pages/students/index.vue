
<template>
<v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <h1>Student Database</h1>
      
      <v-form v-model="valid" ref="form" lazy-validation>
        <v-text-field
          label="Name"
          v-model="name"
          required
        ></v-text-field>
        <v-text-field
          label="Phone Number"
          v-model="phone_number"
          required
        ></v-text-field>
        </v-form>
        <v-text-field
          label="Semester Average"
          v-model="semester_average"
          required
        ></v-text-field>
      <v-btn color="success" @click="onSubmit">Add Student</v-btn>

    <table id="firstTable">
  <thead>
    <tr>
      <th>No.</th>
      <th>Name</th>
      <th>Phone</th>
      <th>Grade Average</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(student,index) in students" :key="index">
      <td>{{student.id}}</td>
      <td>{{student.name}}</td>
      <td>{{student.phone_number}}</td>
      <td>{{student.semester_average}}</td>
      <button @click="deleteRow(index,student.id)">Delete</button>

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
    return axios.get("http://localhost:8000/students/").then(res => {
      return { students: res.data };
    });
  },
  data() {
    return {
      students: "",
      name: "",
      phone_number: "",
      semester_average: ""
    };
  },
  methods: {
    deleteRow(index, studentID) {
      axios
        .delete(`http://localhoost:8000/students/${studentID}`)
        .then(response => this.students.splice(index, 1))
        .catch(function(error) {
          console.log(error.response);
        });
    },
    onSubmit() {
      let vue = this;
      axios
        .post("http://localhost:8000/students/", {
          name: this.name,
          phone_number: this.phone_number,
          semester_average: this.semester_average
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
