<template>
  <div class="playing-field">
    <GameStarter v-if="!spectating & !playing & !paused" />
    <GameSpectator v-if="spectating" />
    <GameEnder v-if="ended" />
    <GamePauser v-if="paused" />
    <BlackjackPlayer v-if="playing" />
  </div>
</template>

<script>
import GameStarter from '../components/gameComponents/GameStarter';
import GameEnder from '../components/gameComponents/GameEnder';
import GameSpectator from '../components/gameComponents/GameSpectator';
import GamePauser from '../components/gameComponents/GamePauser';
import BlackjackPlayer from '../components/blackjack/BlackjackPlayer';
import { mapState } from 'vuex';

export default {
  name: 'Blackjack',
  computed: {
    ...mapState(['name', 'winner'])
  },
  watch: {
    winner (newValue) {
      if (newValue.length !== 0) {
        this.ended = true;
        if (this.name.localeCompare('P1') === 0)
        this.$socket.emit('game ended');
      }
    }
  },
  components: {
    GameStarter,
    GameSpectator,
    GameEnder,
    BlackjackPlayer,
    GamePauser
  },
  methods: {
    setToSpectator: function() {
      this.playing = false;
      this.spectating = true;
    },
    setToPlaying: function() {
      this.playing = true;
      this.spectating = false;
    },
    setToPause: function() {
      this.paused = true;
      this.spectating = false;
      this.ended = false;
    }
  },
  created() {
    this.$socket.on('game in progress', () => {
      this.setToSpectator();
    });
    this.$eventBus.$on('reset', () => {
      this.ended = false;
    });
    this.$socket.on('start game', () => {
      this.setToPlaying();
    });
    this.$socket.on('game ended', () => {
      if (this.spectating === true) {
        this.spectating = false;
      }
    });
    this.$socket.on('suspend game', () => {
      this.setToPause();
    });
  },
  beforeDestroy() {
    this.$socket.removeListener('game in progress');
    this.$socket.removeListener('suspend game');
    this.$socket.removeListener('start game');
    this.$socket.removeListener('game ended');
  },
  data() {
    return {
      playing: false,
      ended: false,
      spectating: false,
      paused: false
    }
  }
}
</script>

<style>
</style>