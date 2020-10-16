<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  data() {
    return {
      todos: [
        'hello',
        'bonjour',
        'hola'
        ]
    }
  }
}
</script>

<style>

</style>
