<template>
    <div class="starter-info">
        <h3 class="starter-text"> Game Start </h3>
        <h3 class="starter-text"> {{`${readyUsers} / ${inRoomUsers} users ready`}} </h3>
    </div>
</template>

<script>

export default {
  name: 'GameStarter',
  components: {
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
      this.inRoomUsers = numUsers;
      this.checkToStartGame();
    });
    this.$socket.on('current ready', readyUsers => {
      this.readyUsers = readyUsers;
      this.checkToStartGame();
    });
    this.$socket.emit('get room users', null);
  },
  data() {
    return {
        inRoomUsers: 0,
        readyUsers: 0
    }
  }
}
</script>

<style>
.starter-text {
  text-align: center;
  font-family: 'Comm Bold';
  color: white;
}

.starter-info {
  display: flex;
  flex-direction: column;
  height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>