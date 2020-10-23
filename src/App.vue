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
  beforeDestory() {
    this.$socket.disconnect();
  },
  data() {
    return {
    }
  }
}
</script>

<style>
@font-face {
    font-family: 'Comm Bold';
    src: url('./assets/fonts/Commissioner-SemiBold.ttf');
}
</style>
