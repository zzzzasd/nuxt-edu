

<template>
  <div class="container">
    <h1>User Agent</h1>
    <p>{{ userAgent }}</p>
    <p><nuxt-link to="/subjects">Subject Page</nuxt-link></p>
    <p><nuxt-link to="/attendance">Attendance Page</nuxt-link></p>
    <p><nuxt-link to="/students">Student Page</nuxt-link></p>
    
  </div>
</template>

<script>
export default {
  asyncData: ({ req }) => ({
    userAgent: req
      ? req.headers["user-agent"]
      : typeof navigator !== "undefined"
        ? navigator.userAgent
        : "No user agent (generated)"
  })
};
</script>

<style scoped>
.container {
  width: 70%;
  margin: auto;
  text-align: center;
  padding-top: 100px;
}
p {
  font-size: 20px;
}
a {
  color: #41b883;
}
</style>
