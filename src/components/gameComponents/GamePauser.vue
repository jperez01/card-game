<template>
  <div>
    <section class="game-info">
        <h3 class="game-text"> User left match </h3>
        <button class="button" v-on:click="enableReturn"> Return Home </button>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'GamePauser',
  computed: {
    ...mapState(['inRoomUsers', 'readyUsers', 'name'])
  },
  methods: {
    enableReturn: function () {
      this.$store.dispatch('resetAllTotals');
      this.$router.push('/');
    }
  }
}
</script>

<style>
</style>