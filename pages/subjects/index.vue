<template>
  <div class="container">
    <h1>Subjects</h1>
    <ul>
      <li v-for="(subject, index) in subjects" :key="index">
        <nuxt-link :to="{ name: 'subjects-id', params: { id: subject.pk } }">{{ subject.title }}</nuxt-link>
        <button @click="deleteButton(index, subject.pk)">Remove</button>
      </li>
    </ul>
    <input v-model="title"/>
    <button @click="onSubmit">Submit</button>
    <p><nuxt-link to="/">Back to home page</nuxt-link></p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  asyncData({ req, params }) {
    // We can return a Promise instead of calling the callback
    return axios.get("http://localhost:8000/subjects").then(res => {
      return { subjects: res.data};
    });
  },
  data () {
    return {
      title:''
    }
  },
  head: {
    title: "List of subjects"
  },
  methods: {
    deleteButton(index, subjectPk) {
      axios.delete(`http://localhost:8000/subjects/${subjectPk}`)
      .then(response => this.subjects.splice(index,1))
      .catch(function (error) {
        console.log(error.response);
      });
    },
    onSubmit() {
      let vue = this
      axios.post("http://localhost:8000/subjects/", {
        title: this.title,
        lists:[],
      }).then(function (response) {
        vue.subjects.push(response.data)
        console.log(response);
      })
      .catch(function (error) {
        console.log(error.response);
      });
    }
  }
};
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