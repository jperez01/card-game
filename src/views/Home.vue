<template>
  <div id="app" class="field">
    <h3 class="title"> Games </h3>
    <router-link class="link" to="/matching"> Matching </router-link>
    <router-link class="link" to="/test"> Test </router-link>
    <div class="multiplayer" v-if="this.enabledMult"> 
      <h3 class="type"> Multiplayer </h3>
      <router-link class="link" to="/blackjack"> Blackjack </router-link>
    </div>
    <button v-on:click="sendMessage"> Create Room </button>
    <h3>{{roomID}} </h3>
    <h3>{{name}} </h3>
    <input v-on:change="collectID">
    <button v-on:click="joinRoom"> Join Room </button>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState(['roomID', 'name'])
  },
  methods: {
    collectID: function(e) {
      this.potentialID = e.target.value;
    },
    sendMessage: function() {
      this.$socket.emit('create room');
    },
    joinRoom: function() {
      this.$socket.emit('join room', this.potentialID);
    },
    enableMultiplayer: function() {
      this.enabledMult = true;
    }
  },
  created() {
    this.$socket.on('created', (roomID, name) => {
      this.$store.commit('setName', `P${name}`);
      this.$store.commit('setRoomID', roomID);
    });
    this.$socket.on('enough players', () => {
      this.enableMultiplayer();
    })
    this.$socket.on('joined room', (name) => {
      this.$store.commit('setName', `P${name}`);
      this.$store.commit('setRoomID', this.potentialID);
      this.enableMultiplayer();
    });
  },
  data() {
    return {
      potentialID: '',
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
