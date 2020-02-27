<template>
  <div id="app">
    <TradeApp msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
import TradeApp from "./components/TradeApp.vue";

export default {
  name: "App",
  components: {
    TradeApp
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
