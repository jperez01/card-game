<template>
  <div class="playing-field">
    <GameStarter v-if="!spectating & !playing" />
    <GameSpectator v-if="spectating" />
    <GameEnder @startGame="setToPlaying" :winner="this.winner" v-if="ended" />
    <BlackjackPlayer :name="this.name" :players="this.players" v-if="playing" />
  </div>
</template>

<script>
import GameStarter from '../components/GameStarter';
import GameEnder from '../components/gameComponents/GameEnder';
import GameSpectator from '../components/gameComponents/GameSpectator';
import BlackjackPlayer from '../components/blackjack/BlackjackPlayer';
import { EventBus } from '../main';

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
      if (this.name.length !== 0) {
        this.playing = true;
        this.spectating = false;
      }
    }
  },
  created() {
    this.$socket.on('player name', number => {
      this.name = 'P' + number;
    });
    this.$socket.on('room users', users => {
      this.players = users;
    });
    this.$socket.on('game in progress', () => {
      this.setToSpectator();
    });
    this.$socket.on('reset', () => {
      this.playing = true;
    });
    this.$socket.on('start game', () => {
      this.setToPlaying();
    });
    EventBus.$on('winner', name => {
      this.winner = name;
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