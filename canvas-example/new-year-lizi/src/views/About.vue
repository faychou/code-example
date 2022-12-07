<template>
  <div class="about">
    <h1>This is an about page</h1>
    <img src="../assets/logo.png" alt="">
    <img :src="url2" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      url1: "../assets/logo.png",
      url2: require("../assets/logo.png"),
    }
  }
}
</script>