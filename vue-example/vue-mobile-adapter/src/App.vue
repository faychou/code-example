<template>
  <div id="app">
    <router-view/>
    <div id="tap">
      <router-link to="/">Home</router-link> |
      <router-link to="/list">List</router-link> |
      <router-link to="/about">About</router-link>
    </div>
  </div>
</template>

<style lang="less">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#tap {
  width: 100%;
  height: 80px;
  line-height: 80px;
  background: #eee;
  box-shadow: 0 -1px 2px #ddd;
  position: fixed;
  bottom: 0;
  left: 0;

  a {
    font-weight: bold;
    color: #2c3e50;
    font-size: 26px;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
