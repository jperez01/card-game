<template>
    <section class="game-info" >
        <h3 class="game-text"> Game Ended </h3>
        <h3 class="game-text"> Winner: {{winner}} </h3>
        <h3 class="game-text" v-if="reset" > {{`${readyUsers} / ${inRoomUsers} users ready`}} </h3>
        <button class="game-button" v-if="!reset" v-on:click="enableReset"> Reset Game </button>
    </section>
</template>

<script>
import { EventBus } from '../../main';
import { mapState } from 'vuex';

export default {
  name: 'GameEnder',
  computed: {
    ...mapState(['inRoomUsers', 'readyUsers', 'winner'])
  },
  methods: {
      enableReset: function() {
        this.reset = true;
        this.$socket.emit('enable reset');
      },
      checkToReset: function() {
        this.gameStarted = this.inRoomUsers === this.readyUsers;
        if (this.gameStarted) {
          this.$store.commit('setInRoomUsers', 0);
          this.$store.commit('setReadyUsers', 0);
          EventBus.$emit('reset field');
          setTimeout(() => {
            EventBus.$emit('reset player');
          }, 500);
          setTimeout(() => {
            EventBus.$emit('reset');
            this.reset = false;
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