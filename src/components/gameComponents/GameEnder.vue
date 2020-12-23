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

export default {
  name: 'GameEnder',
  props: ['winner'],
  methods: {
      enableReset: function() {
        this.reset = true;
        console.log("Enabling Reset by sending to server");
        this.$socket.emit('enable reset');
      },
      checkToReset: function() {
        this.gameStarted = this.inRoomUsers === this.readyUsers;
        if (this.gameStarted) {
          this.inRoomUsers = 0;
          this.readyUsers = 0;
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
      this.inRoomUsers = numUsers;
    });
    this.$socket.on('current ready', readyUsers => {
      this.readyUsers = readyUsers;
      this.checkToReset();
    });
  },
  data() {
      return {
          reset: false,
          readyUsers: 0,
          inRoomUsers: 0,
      }
  }
}
</script>

<style>
</style>