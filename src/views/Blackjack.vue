<template>
  <div class="playing-field">
    <GameStarter v-if="!spectating & !playing" />
    <GameSpectator v-if="spectating" />
    <GameEnder :winner="this.winner" v-if="ended" />
    <BlackjackPlayer :name="this.name" :players="this.players" v-if="playing" />
  </div>
</template>

<script>
import GameStarter from '../components/GameStarter';
import GameEnder from '../components/gameComponents/GameEnder';
import GameSpectator from '../components/gameComponents/GameSpectator';
import BlackjackPlayer from '../components/blackjack/BlackjackPlayer';
import { EventBus } from '../main';
import GlobalData from '../services/GlobalData';

export default {
  name: 'Blackjack',
  components: {
    GameStarter,
    GameSpectator,
    GameEnder,
    BlackjackPlayer
  },
  methods: {
    setToSpectator: function() {
      this.playing = false;
      this.spectating = true;
    },
    setToPlaying: function() {
      this.playing = true;
      this.spectating = false;
    }
  },
  created() {
    this.name = GlobalData.name;
    this.$socket.on('room users', users => {
      this.players = users;
    });
    this.$socket.on('game in progress', () => {
      this.setToSpectator();
    });
    EventBus.$on('reset', () => {
      this.ended = false;
    });
    this.$socket.on('start game', () => {
      this.setToPlaying();
    });
    EventBus.$on('winner', name => {
      this.winner = name;
      this.$socket.emit('game ended', null);
      this.ended = true;
    });
  },
  data() {
    return {
      playing: false,
      name: '',
      players: 0,
      winner: '',
      ended: false,
      spectating: false
    }
  }
}
</script>

<style>
</style>