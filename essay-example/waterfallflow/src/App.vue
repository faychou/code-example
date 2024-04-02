<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div class="wrapper">
      <nav>
        <RouterLink to="/">waterfallColumn</RouterLink>
        <RouterLink to="/waterfallFlex">waterfallFlex</RouterLink>
        <RouterLink to="/waterfallGrid">waterfallGrid</RouterLink>
        <RouterLink to="/waterfallJs">waterfallJs</RouterLink>
      </nav>
    </div>
  </header>

  <div class="body">
    <RouterView />
  </div>
</template>

<style scoped>
header {
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  box-shadow: 0 1px 2px #ccc;
}

nav {
  font-size: 12px;
  text-align: center;
}

nav a {
  color: #333;
  padding: 0 10px;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: rgb(31, 164, 31);
}

.body {
  margin-top: 10px;
}
</style>
