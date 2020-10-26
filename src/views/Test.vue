<template>
    <div class="playing-field">
        <BlackjackPlayer />
    </div>
</template>

<script>
import BlackjackPlayer from '../components/blackjack/BlackjackPlayer';

export default {
  name: 'Test',
  components: {
      BlackjackPlayer
  },
  methods: {
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