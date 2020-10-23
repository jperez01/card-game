<template>
  <div id="app" class="field">
    <h3 class="title"> Games </h3>
    <router-link class="link" to="/matching"> Matching </router-link>
    <div class="multiplayer" v-if="this.enabledMult"> 
      <h3 class="type"> Multiplayer </h3>
      <router-link class="link" to="/blackjack"> Blackjack </router-link>
    </div>
    <button v-on:click="sendMessage"> Create Room </button>
    <h3>{{roomID}} </h3>
    <input v-on:change="collectID">
    <button v-on:click="joinRoom"> Join Room </button>
    <button v-on:click="sendGreeting"> Send Greeting </button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  methods: {
    collectID: function(e) {
      this.potentialId = e.target.value;
    },
    sendGreeting: function() {
      this.socket.emit('send to users', this.potentialId);
    },
    sendMessage: function() {
      this.socket.emit('create room');
    },
    joinRoom: function() {
      this.socket.emit('join room', this.potentialId);
    },
    enableMultiplayer: function() {
      this.enabledMult = true;
    }
  },
  created() {
    this.socket = this.$socket;
    this.socket.on('created', data => {
      this.roomID = data;
    });
    this.socket.on('enough players', () => {
      this.enableMultiplayer();
    })
    this.socket.on('joined room', () => {
      this.roomID = this.potentialId;
      this.enableMultiplayer();
    });
    this.socket.on('Hello', () => {
      console.log('Greeting received');
    });
  },
  beforeDestroy() {
  },
  data() {
    return {
      roomID: '',
      potentialId: '',
      enabledMult: false
    }
  }
}
</script>

<style>

.field {
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: #45a173;
  flex-direction: column;
  align-items: center;
}

.link {
    height: 25px;
    text-align: center;
    font-family: 'Comm Bold';
    color: white;
    font-size: 20px;
    padding: 10px;
    margin: 20px;
    text-decoration: none;
    border: 1px solid white;
}

.link:hover {
  background-color:rgba(66, 65, 65, .4);
}

.multiplayer {
  min-height: 15vh;
}

.title {
  text-align: center;
  font-family: 'Comm Bold';
  color: white;
  font-size: 24px;
  margin: 20px 0px 0px 0px;
}

.type {
  text-align: center;
  font-family: 'Comm Bold';
  color: white;
  font-size: 24px;
}
</style>
