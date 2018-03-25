<template>
  <div class="container">
    <h1>{{ subject.title }}</h1>
    <ul>
      <li v-for="(list, index) in subject.lists" :key="index">
        {{ list.title }}
      </li>
    </ul>
    <input v-model="title"/>
    <button @click="onSubmit">Submit</button>
    <p><nuxt-link to="/subjects">Back to the list</nuxt-link></p>
  </div>
</template>

<script>
import axios from "axios";

export default {
  async asyncData({ params }) {
    // We can use async/await ES6 feature
    const { data } = await axios.get(
      `http://localhost:8000/subjects/${params.id}`
    );
    console.log(DataTransfer);
    return { subject: data };
  },
  data() {
    return {
      title: ""
    };
  },
  methods: {
    onSubmit() {
      const newLists = [...this.subject.lists, { title: this.title }];
      axios
        .patch(`http://localhost:8000/subjects/${this.$route.params.id}/`, {
          lists: newLists
        })
        .then(response => {
          this.subject = response.data
        })
        .catch(function(error) {
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