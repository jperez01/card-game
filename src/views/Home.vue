<template>
  <div id="app" class="field">
    <h3 class="title"> Games </h3>
    <router-link class="link" to="/matching"> Matching </router-link>
    <button v-on:click="sendMessage"> Send Message </button>
  </div>
</template>

<script>
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://localhost:5000';

export default {
  name: 'App',
  components: {
  },
  methods: {
    sendMessage: function() {
      this.socket.emit('message', 'Message sent');
    }
  },
  created() {
    this.socket = socketIOClient(ENDPOINT);
    this.socket.on('FirstEmit', data => {
      console.log(data);
    });
  },
  beforeDestroy() {
    this.socket.disconnect();
  },
  data() {
    return {
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

.title {
  text-align: center;
  font-family: 'Comm Bold';
  color: white;
  font-size: 24px;
  margin: 20px 0px 0px 0px;
}
</style>
