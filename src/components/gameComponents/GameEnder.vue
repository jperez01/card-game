<template>
    <section class="game-info" >
        <h3 class="game-text"> Game Ended </h3>
        <h3 class="game-text"> Winner: {{winner}} </h3>
        <h3 class="game-text" v-if="reset" > {{`${readyUsers} / ${inRoomUsers} users ready`}} </h3>
        <button class="button" v-if="!reset" v-on:click="enableReset"> Reset Game </button>
    </section>
</template>

<script>
import { EventBus } from '../../main';
import { mapState } from 'vuex';

export default {
  name: 'GameEnder',
  computed: {
    ...mapState(['inRoomUsers', 'readyUsers', 'winner', 'name'])
  },
  methods: {
      enableReset: function() {
        this.reset = true;
        this.$socket.emit('enable reset');
      },
      checkToReset: function() {
        this.gameStarted = this.inRoomUsers === this.readyUsers;
        if (this.gameStarted) {
          if (this.name.localeCompare('P1') === 0) {
            this.$socket.emit('game started');
          }
          EventBus.$emit('reset field');
          this.$store.dispatch('resetAllTotals');
          this.$store.commit('setWinner', '');
          setTimeout(() => {
            EventBus.$emit('reset');
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
  data() {
      return {
        reset: false
      }
  }
}
</script>

<style>
</style>