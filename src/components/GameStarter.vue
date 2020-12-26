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
    ...mapState(['readyUsers', 'inRoomUsers'])
  },
  methods: {
    checkToStartGame: function() {
      let gameStarted = this.inRoomUsers === this.readyUsers;
      if (gameStarted) {
        this.$socket.emit('game started', null);
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
    this.$socket.emit('get room users', null);
  },
  data() {
    return {
    }
  }
}
</script>

<style>
</style>