<template>
  <div id="app">
    <div class="container">
      <navbar></navbar>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import navbar from './components/Navbar.vue'

export default {
  components: {
    navbar
  }
}
</script>

<style>
#app {
  margin-top: 2rem;
}
</style>
