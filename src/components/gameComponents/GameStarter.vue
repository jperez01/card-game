<template>
    <div class="game-info">
        <h3 class="game-text"> Game Start </h3>
        <h3 class="game-text"> {{`${readyUsers} / ${inRoomUsers} users ready`}} </h3>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'GameStarter',
  computed: {
    ...mapState(['readyUsers', 'inRoomUsers', 'name', 'roomID'])
  },
  methods: {
    checkToStartGame: function() {
      let gameStarted = this.inRoomUsers === this.readyUsers;
      if (gameStarted && this.name.localeCompare('P1') === 0) {
        this.$socket.emit('game started');
      }
    }
  },
  created() {
    this.$socket.on('room users', numUsers => {
      this.$store.commit('setInRoomUsers', numUsers);
      this.checkToStartGame();
    });
    this.$socket.on('current ready', readyUsers => {
      this.$store.commit('setReadyUsers', readyUsers);
      this.checkToStartGame();
    });
    this.$socket.emit('get room users');
  },
  beforeDestroy() {
    this.$socket.removeListener('room users');
    this.$socket.removeListener('current ready');
  }
}
</script>

<style>
</style>