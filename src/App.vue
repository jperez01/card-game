<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {
  },
  beforeDestroy() {
    this.$socket.disconnect();
  },
  data() {
    return {
    }
  }
}
</script>

<style>
@font-face {
    font-family: 'Comm Bold';
    src: url('./assets/fonts/Commissioner-SemiBold.ttf');
}

.card {
  height: 160px;
  transform: translate(0,0);
  transition: transform .3s cubic-bezier(0.075, 0.82, 0.165, 1);
  transform-style: preserve-3d;
  display: flex;
  justify-content: center;
}

.card.is-flipped {
  transform: rotateY(180deg);
  transition: transform 1s;
}

.card__face {
  position: absolute;
  pointer-events: none;
  backface-visibility: hidden;
  box-shadow: 0 0.0625em 0.125em rgba(0, 0, 0, 0.15);
  border-radius: 5px;
}

.card__face--front {
  height: 160px;
}

.card__face--back {
  height: 160px;
  transform: rotateY(180deg);
}

.game-text {
  text-align: center;
  font-family: 'Comm Bold';
  color: white;
}

.game-info {
  position: absolute;
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  align-items: center;
  justify-content: center;
  z-index: 4;
  background-color: rgba(0, 0, 0, 0.5);
}
</style>
