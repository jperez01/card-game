<template>
    <section class="game-info" >
        <h3 class="game-text"> Game Ended </h3>
        <h3 class="game-text"> Winner: {{winner}} </h3>
        <h3 class="game-text" v-if="reset" > {{`${readyUsers} / ${inRoomUsers} users ready`}} </h3>
        <button class="game-button" v-if="!reset" v-on:click="enableReset"> Reset Game </button>
    </section>
</template>

<script>
export default {
  name: 'GameEnder',
  props: ['winner'],
  methods: {
      enableReset: function() {
        this.reset = true;
        this.$socket.emit('enable reset', null);
      },
      checkToReset: function() {
        this.gameStarted = this.inRoomUsers === this.readyUsers;
        if (this.gameStarted) {
            this.$socket.emit('game started', null);
            this.$emit('startGame');
        }
    }
  },
  created() {
    this.$socket.on('room users', numUsers => {
      console.log(numUsers);
      this.inRoomUsers = numUsers;
      this.checkToReset();
    });
    this.$socket.on('current ready', readyUsers => {
      console.log(readyUsers);
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