<template>
    <section class="game-info" >
        <h3 class="game-text"> Game Ended </h3>
        <h3 class="game-text"> Winner: {{winner}} </h3>
        <h3 class="game-text" v-if="reset" > {{`${readyUsers} / ${inRoomUsers} users ready`}} </h3>
        <button class="button" v-if="!reset" v-on:click="enableReset"> Reset Game </button>
        <button class="button" v-on:click="enableReturn"> Return Home </button>
    </section>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'GameEnder',
  computed: {
    ...mapState(['inRoomUsers', 'readyUsers', 'winner', 'name'])
  },
  methods: {
      enableReturn: function () {
        if (this.reset) {
          this.$socket.emit('cancel reset');
        }
        this.$store.dispatch('resetAllTotals');
        this.$router.push('/');
      },
      enableReset: function() {
        this.reset = true;
        this.$socket.emit('enable reset');
      },
      checkToReset: function() {
        let gameCanStart = this.inRoomUsers === this.readyUsers;
        if (gameCanStart) {
          if (this.name.localeCompare('P1') === 0) {
            this.$socket.emit('game started');
          }
          this.$eventBus.$emit('reset field');
          this.$store.dispatch('resetAllTotals');
          this.$store.commit('setWinner', '');
          setTimeout(() => {
            this.$eventBus.$emit('reset');
            this.$store.commit('setReadyUsers', 0);
          }, 2000);
        }
    }
  },
  created() {
    this.$socket.on('room users', numUsers => {
      this.$store.commit('setInRoomUsers', numUsers);
    });
    this.$socket.on('current ready', readyUsers => {
      this.$store.commit('setReadyUsers', readyUsers);
      this.checkToReset();
    });
    this.$socket.emit('get end users');
  },
  beforeDestroy() {
    this.$socket.removeListener('room users');
    this.$socket.removeListener('current ready');
  },
  data() {
      return {
        reset: false
      }
  }
}
</script>

<style>
</style>