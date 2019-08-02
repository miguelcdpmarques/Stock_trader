<template>
    <div class="home-component">
        <h1>Trade or View your Portfolio</h1>
        <p>You may Save & Load your data.</p>
        <p>Click on End Day to begin a new day!</p>
        <hr>
        <h4>Your funds: ${{ funds | formatNumber }}</h4>
    </div>
</template>

<script>
export default {
    computed: {
    funds() {
      return this.$store.state.funds
    }
  }
}
</script>

<style>
.home-component {
    border: 1px solid grey;
    padding: 3rem;
}
</style>
