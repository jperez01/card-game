<template>
  <div id="app" class="field">
    <div class="section">
      <h3 class="type"> Single Player Games </h3>
      <router-link class="link" to="/matching"> Matching </router-link>
    </div>
    <div class="section">
      <h3 class="type"> Multiplayer Games </h3>
      <div class="centered-items" v-if="this.showDetails">
        <h3 class="text"> Room ID: {{roomID}} </h3>
        <h3 class="text"> Player: {{name}} </h3>
        <button class="button" v-on:click="copyID"> Copy Room ID </button>
        <button class="button" v-on:click="leaveRoom"> Leave Room </button>
      </div>
      <div class="centered-items" v-if="this.enabledMult">
        <router-link class="link" to="/blackjack"> Blackjack </router-link>
      </div>
      <div class="centered-items" v-if="!this.showDetails">
        <button class="button" v-on:click="createRoom"> Create Room </button>
        <h3 class="error" v-if="error"> Code does not work </h3>
        <input class="input" v-on:change="collectID">
        <button class="button" v-on:click="joinRoom"> Join Room </button>
      </div>
    </div>
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
    copyID: function() {
      // Creates dummy text area and then selects its content
      var dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = this.roomID;
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    },
    checkForReturn: function () {
      if (this.roomID.length !== 0) {
        this.enableMultiplayer();
        this.showDetails = true;
      }
    },
    collectID: function(e) {
      this.potentialID = e.target.value;
    },
    createRoom: function() {
      this.$socket.emit('create room');
    },
    joinRoom: function() {
      if (this.potentialID.length > 0) {
        this.$socket.emit('join room', this.potentialID);
      }
    },
    leaveRoom: function() {
      this.$socket.emit('leave room', this.roomID);
      this.$store.dispatch('leaveRoom');
      this.enabledMult = false;
      this.showDetails = false;
      this.potentialID = '';
    },
    enableMultiplayer: function() {
      this.enabledMult = true;
    },
    disableMultiplayer: function() {
      this.enabledMult = false;
    },
    enableError: function () {
      this.error = true;
    },
    disableError: function() {
      this.error = false;
    }
  },
  created() {
    this.$socket.on('created', (roomID, name) => {
      this.$store.commit('setName', `P${name}`);
      this.$store.dispatch('joinRoom', roomID);
      this.showDetails = true;
      this.disableError();
    });
    this.$socket.on('enough players', () => {
      this.enableMultiplayer();
    });
    this.$socket.on('joined room', (name) => {
      this.$store.commit('setName', name);
      this.$store.dispatch('joinRoom', this.potentialID);
      this.showDetails = true;
      this.enableMultiplayer();
      this.disableError();
    });
    this.$socket.on('player left', players => {
      if (players < 2) {
        this.disableMultiplayer();
      }
    });
    this.$socket.on('wrong id', () => {
      this.potentialID = '';
      this.enableError();
    })
    this.checkForReturn();
  },
  data() {
    return {
      potentialID: '',
      enabledMult: false,
      showDetails: false,
      error: false
    }
  },
  beforeDestroy() {
    this.$socket.removeListener('enough players');
    this.$socket.removeListener('created');
    this.$socket.removeListener('joined room');
    this.$socket.removeListener('player left');
    this.$socket.removeListener('wrong id');
  }
}
</script>

<style>

.field {
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: #45a173;
  flex-direction: row;
  justify-content: center;
}

.link {
  text-align: center;
  font-family: 'Comm Bold';
  color: white;
  font-size: 1rem;
  padding: 10px;
  margin: 20px;
  width: 5rem;
  text-decoration: none;
  border: 1px solid white;
}

.link:hover {
  background-color:rgba(66, 65, 65, .4);
}

.button {
  text-align: center;
  font-family: 'Comm Bold';
  color: white;
  font-size: 1rem;
  padding: 10px;
  margin: 20px;
  text-decoration: none;
  border: 1px solid white;
  background: none;
  outline: none;
  cursor: pointer;
}

.button:hover {
  background-color:rgba(66, 65, 65, .4);
}

.input {
  text-align: center;
  font-family: 'Comm Bold';
  color: white;
  font-size: 15px;
  padding: 5px 10px;
  border: 1px solid white;
  width: 80%;
  background: white;
  outline: none;
}

.input:focus {
  background: none;
}

.section {
  display: flex;
  flex-direction: column;
  margin: 3% 4%;
  align-items: center;
}

.centered-items {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.title {
  text-align: center;
  font-family: 'Comm Bold';
  color: white;
  font-size: 5vw;
  margin: 20px 0px 0px 0px;
}

.text {
  text-align: center;
  font-family: 'Comm Bold';
  color: white;
}

.type {
  text-align: center;
  font-family: 'Comm Bold';
  color: white;
  font-size: 24px;
}

.error {
  text-align: center;
  font-family: 'Comm Bold';
  color: red;
  margin: 0px 0px 20px 0px;
}

</style>
