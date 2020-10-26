<template>
  <div class="playing-field">
    <GameStarter  @inProgress="setToSpectator" @startGame="setToPlaying"/>
    <BlackjackSpectator v-if="spectating" />
    <BlackjackPlayer v-if="playing" />
  </div>
</template>

<script>
import GameStarter from '../components/GameStarter';

export default {
  name: 'Blackjack',
  components: {
    GameStarter
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
  data() {
    return {
      playing: false,
      spectating: false
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