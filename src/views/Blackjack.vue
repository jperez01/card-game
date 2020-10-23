<template>
  <div class="playing-field">
    <GameStarter />
  </div>
</template>

<script>
import GameStarter from '../components/GameStarter';

export default {
  name: 'Blackjack',
  components: {
    GameStarter
  },
  data() {
    return {
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