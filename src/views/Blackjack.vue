<template>
  <div class="playing-field">
    <GameStarter v-if="!spectating & !playing" />
    <GameSpectator v-if="spectating" />
    <GameEnder v-if="ended" />
    <BlackjackPlayer v-if="playing" />
  </div>
</template>

<script>
import GameStarter from '../components/GameStarter';
import GameEnder from '../components/gameComponents/GameEnder';
import GameSpectator from '../components/gameComponents/GameSpectator';
import BlackjackPlayer from '../components/blackjack/BlackjackPlayer';
import { EventBus } from '../main';
import { mapState } from 'vuex';

export default {
  name: 'Blackjack',
  computed: {
    ...mapState(['name', 'winner'])
  },
  watch: {
    winner () {
      this.ended = true;
      this.$socket.emit('game ended');
    }
  },
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
    this.$socket.on('game in progress', () => {
      this.setToSpectator();
    });
    EventBus.$on('reset', () => {
      this.ended = false;
    });
    this.$socket.on('start game', () => {
      this.setToPlaying();
    });
  },
  data() {
    return {
      playing: false,
      players: 0,
      ended: false,
      spectating: false
    }
  }
}
</script>

<style>
</style>