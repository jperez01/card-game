<template>
  <div class="playing-field">
    <GameStarter  @inProgress="setToSpectator" @startGame="setToPlaying"/>
    <BlackjackSpectator :players="this.players" v-if="spectating" />
    <BlackjackPlayer :name="this.name" :players="this.players" v-if="playing" />
  </div>
</template>

<script>
import GameStarter from '../components/GameStarter';
import BlackjackSpectator from '../components/blackjack/BlackjackSpectator';
import BlackjackPlayer from '../components/blackjack/BlackjackPlayer';

export default {
  name: 'Blackjack',
  components: {
    GameStarter,
    BlackjackSpectator,
    BlackjackPlayer
  },
  methods: {
    setToSpectator: function() {
      this.spectating = true;
      this.playing = false;
    },
    setToPlaying: function() {
      this.playing = true;
      this.spectating = false;
    }
  },
  created() {
    this.$socket.on('player name', number => {
      this.name = 'P' + number;
    });
    this.$socket.on('room users', users => {
      this.players = users;
    })
  },
  data() {
    return {
      playing: false,
      spectating: false,
      name: '',
      players: 0
    }
  }
}
</script>

<style>
.playing-field {
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color: #45a173;
  flex-direction: column;
}
</style>